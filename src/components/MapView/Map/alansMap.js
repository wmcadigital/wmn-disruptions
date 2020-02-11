import React from 'react';
import L from 'leaflet';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markerPosition: { lat: 52.486125, lng: -1.878662 },
      lines: 1,
      issue: '',
      titlelist: '1',
      titlesout: '1'
    };
  }

  componentDidMount() {
    this.setState({ issue: 'test issues' });
    this.map = L.map('map', {
      center: [52.486125, -1.878662],
      zoom: 8,
      layers: [
        L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: '&copy; <a href="#">ESRI</a> contributors'
          }
        )
      ]
    });
    this.marker = L.marker(this.state.markerPosition)
      .addTo(this.map)
      .bindPopup('Birmingham');
  }

  addLines(lines) {
    // console.log(lines);
    // var linesin = JSON.parse(lines);
    this.group = new L.FeatureGroup();
    for (let i = 0; i < lines.length; i++) {
      this.titles += lines[i].title;
      this.titles += ',';
      const obj = lines[i];
      const linesin = JSON.parse(obj.spatial);
      this.ll = L.geoJSON(linesin);
      this.group.addLayer(this.ll);
    }
    this.setState({ issue: this.titles });
    this.map.addLayer(this.group);
    this.map.fitBounds(this.group.getBounds());
    this.temp = this.renderTitles();
    this.setState({ titlesout: this.temp });
  }

  testalert() {
    this.map.removeLayer(this.group);
    this.setState({ issue: '' });
  }

  testadd() {
    this.setState({ issue: '' });
    fetch('https://14j9t8wdf9.execute-api.eu-west-1.amazonaws.com/HighwaysHE/he/1')
      .then(res => res.json())
      .then(data => {
        // this.setState({lines: data[0].spatial});
        this.setState({ lines: data });
        this.addLines(this.state.lines);
      });
  }

  renderTitles() {
    if (this.state.titlelist) {
      const rows = [];
      for (let i = 0; i < this.state.titlelist.length; i++) {
        rows.push(`<p>${this.state.titlelist[i]}</p>`);
      }
      // console.log(rows);
      // return "data";
      return rows;
    }
  }

  /**
{(this.state.titlelist).map((value, index) => {
    return <li key={index}>{value}</li>
})}
     {this.state.titlelist[1]}
     * */
  render() {
    return (
      <div>
        <div id="map" />
        <div id="sidepanel">{this.state.titlesout}</div>
        <button id="btn1" onClick={this.testalert.bind(this)}>
          Remove Highways Issues
        </button>
        <button id="btn2" onClick={this.testadd.bind(this)}>
          Add Highways Issues
        </button>
      </div>
    );
  }
}

export default App;
