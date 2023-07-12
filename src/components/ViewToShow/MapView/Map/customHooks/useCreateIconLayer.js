import { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { loadModules } from 'esri-loader';
import { format, parse } from 'fecha';
import { FetchDisruptionsContext } from 'globalState';

const useCreateIconLayer = (view) => {
  const [isCreated, setIsCreated] = useState(false);
  const map = view !== null && view?.map;

  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext);

  const disruptionsData = useMemo(() => {
    return fetchDisruptionsState?.data || [];
  }, [fetchDisruptionsState]);

  const createIconLayer = useCallback(async () => {
    try {
      if (!disruptionsData.length) return;
      const [Graphic, FeatureLayer] = await loadModules([
        'esri/Graphic',
        'esri/layers/FeatureLayer',
      ]);

      const fallbackDate = format(new Date(), 'YYYY-MM-DD');
      const getValidDate = (date) => {
        return date.toLowerCase() !== 'invalid date' ? parse(date, 'isoDateTime') : new Date();
      };

      const disruptionGraphics = disruptionsData.map((disruption) => {
        const {
          disruptionTimeWindow,
          servicesAffected,
          stopsAffected,
          id,
          title,
          mode,
          disruptionSeverity,
          lat,
          lon,
        } = disruption;

        const { start, end } = disruptionTimeWindow || { start: fallbackDate, end: fallbackDate };
        const startDate = format(getValidDate(start), 'YYYY-MM-DD');
        const endDate = format(getValidDate(end), 'YYYY-MM-DD');

        const affectedIds = (() => {
          const services = servicesAffected || [];
          const stops = stopsAffected || [];

          if (mode === 'bus') {
            return services.reduce((accumulator, service) => {
              return `${accumulator}${service.id}, `;
            }, '');
          }

          if (mode === 'train' && servicesAffected[0]?.routeDescriptions) {
            return servicesAffected[0].routeDescriptions.reduce((accumulator, line) => {
              return `${accumulator}${line.description}, `;
            }, '');
          }

          if (mode === 'tram') {
            let ids = '';

            ids = services.reduce((accumulator, service) => {
              return `${accumulator}${service.id}, `;
            }, ids);

            ids = stops.reduce((accumulator, stop) => {
              return `${accumulator}${stop.atcoCode}, `;
            }, ids);

            return ids;
          }

          return '';
        })();

        if (mode === 'tram' && stopsAffected?.length > 0) {
          return stopsAffected.map(
            (stop) =>
              new Graphic({
                attributes: {
                  id,
                  title,
                  mode,
                  disruptionSeverity,
                  mapIcon: `${mode}-${disruptionSeverity}`,
                  servicesAffected: affectedIds,
                  startDate,
                  endDate,
                },
                geometry: {
                  type: 'point',
                  // If no lat/long then default to Birmingham city centre
                  longitude: stop.lon || -1.8960335,
                  latitude: stop.lat || 52.481755,
                  spatialreference: {
                    wkid: 4326,
                  },
                },
              }),
          );
        }

        return new Graphic({
          attributes: {
            id,
            title,
            mode,
            disruptionSeverity,
            mapIcon: `${mode}-${disruptionSeverity}`,
            servicesAffected: affectedIds,
            startDate,
            endDate,
          },
          geometry: {
            type: 'point',
            // If no lat/long then default to Birmingham city centre
            longitude: lon || -1.8960335,
            latitude: lat || 52.481755,
            spatialreference: {
              wkid: 4326,
            },
          },
        });
      });

      const iconLayer = new FeatureLayer({
        id: 'disruptions',
        source: disruptionGraphics.flat(Infinity),
        objectIdField: 'oid', // This must be defined when creating a layer from `Graphic` objects
        fields: [
          {
            name: 'oid',
            alias: 'oid',
            type: 'oid',
          },
          {
            name: 'id',
            alias: 'id',
            type: 'string',
          },
          {
            name: 'title',
            alias: 'title',
            type: 'string',
          },
          {
            name: 'mode',
            alias: 'mode',
            type: 'string',
          },
          {
            name: 'disruptionSeverity',
            alias: 'disruptionSeverity',
            type: 'string',
          },
          {
            name: 'mapIcon',
            alias: 'mapIcon',
            type: 'string',
          },
          {
            name: 'servicesAffected',
            alias: 'servicesAffected',
            type: 'string',
          },
          {
            name: 'stopsAffected',
            alias: 'stopsAffected',
            type: 'string',
          },
          {
            name: 'startDate',
            alias: 'startDate',
            type: 'string',
          },
          {
            name: 'endDate',
            alias: 'endDate',
            type: 'string',
          },
        ],
        renderer: {
          type: 'unique-value',
          field: 'mapIcon',
          uniqueValueInfos: [
            {
              value: 'bus-normal',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/bus-minor.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'bus-high',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/bus-major.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'bus-veryHigh',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/bus-severe.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'train-normal',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/train-minor.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'train-high',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/train-major.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'train-veryHigh',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/train-severe.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'tram-normal',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/tram-minor.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'tram-high',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/tram-major.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'tram-veryHigh',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/tram-severe.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'road-normal',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/road-minor.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'road-high',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/road-major.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'road-veryHigh',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/road-severe.jpg',
                height: '30px',
                width: '50px',
              },
            },
            // Hovered
            {
              value: 'bus-normal-hover',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/bus-minor-hover.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'bus-high-hover',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/bus-major-hover.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'bus-veryHigh-hover',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/bus-severe-hover.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'train-normal-hover',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/train-minor-hover.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'train-high-hover',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/train-major-hover.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'train-veryHigh-hover',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/train-severe-hover.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'tram-normal-hover',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/tram-minor-hover.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'tram-high-hover',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/tram-major-hover.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'tram-veryHigh-hover',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/tram-severe-hover.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'road-normal-hover',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/road-minor-hover.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'road-high-hover',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/road-major-hover.jpg',
                height: '30px',
                width: '50px',
              },
            },
            {
              value: 'road-veryHigh-hover',
              symbol: {
                type: 'picture-marker',
                url: '/map-icons/road-severe-hover.jpg',
                height: '30px',
                width: '50px',
              },
            },
          ],
        },
      });

      map.add(iconLayer);
      map.reorder(iconLayer, 5);
      setIsCreated(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [disruptionsData, map]);

  useEffect(() => {
    if (isCreated || !map) return;
    createIconLayer();
  }, [isCreated, createIconLayer, map]);

  return isCreated;
};

export default useCreateIconLayer;
