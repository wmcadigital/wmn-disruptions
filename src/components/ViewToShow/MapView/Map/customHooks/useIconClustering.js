import { useState, useEffect, useCallback } from 'react';

const useIconClustering = (view, isIconLayerCreated) => {
  const [isCluseringAdded, setIsClusteringAdded] = useState(false);

  const addIconClustering = useCallback(() => {
    if (!view || !view?.map) return;

    const iconLayer = view.map.findLayerById('disruptions');
    if (!iconLayer) return;

    // iconLayer.featureReduction = {
    //   type: 'cluster',
    //   cluserRadius: '50px',
    //   clusterMinSize: '30px',
    //   clusterMaxSize: '30px',
    //   labelingInfo: [
    //     {
    //       deconflictionStrategy: 'none',
    //       labelExpressionInfo: {
    //         expression: "Text($feature.cluster_count, '#,###')",
    //       },
    //       symbol: {
    //         type: 'text',
    //         color: '#004a5d',
    //         backgroundColor: '#004a5d',
    //         font: {
    //           weight: 'bold',
    //           family: 'Noto Sans',
    //           size: '16px',
    //         },
    //       },
    //       labelPlacement: 'above-right',
    //     },
    //   ],
    // };

    setIsClusteringAdded(true);
  }, [view]);

  useEffect(() => {
    if (!view || !view?.map || !isIconLayerCreated || isCluseringAdded) return;
    addIconClustering();
  }, [addIconClustering, isCluseringAdded, isIconLayerCreated, view]);
};

export default useIconClustering;
