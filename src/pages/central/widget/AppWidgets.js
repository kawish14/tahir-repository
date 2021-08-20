import React from 'react'
import { loadModules, setDefaultOptions } from 'esri-loader';

setDefaultOptions({ version: '4.16' })

export default class AppWidgets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            draw: [],
            length: []
        }
        this.polyline = React.createRef()
        this.deletes = React.createRef()
    }


    componentDidMount() {
        let view = this.props.view;
        let map = this.props.map

        loadModules(["esri/layers/FeatureLayer","esri/widgets/Print", "esri/views/draw/Draw", "esri/widgets/Search", "esri/layers/GeoJSONLayer",
         'esri/widgets/Expand',"esri/widgets/BasemapToggle", "esri/Graphic", "esri/widgets/Legend", "esri/geometry/geometryEngine",
         "esri/widgets/Home"

        ], { css: false })
            .then(([FeatureLayer,Print, Draw, Search, GeoJSONLayer, Expand, BasemapToggle, Graphic, Legend, geometryEngine, Home]) => {


                var basemapToggle = new BasemapToggle({
                    view: view,  // The view that provides access to the map's "streets" basemap
                    nextBasemap: "osm"  // Allows for toggling to the "hybrid" basemap
                });
                view.ui.add(basemapToggle, 'bottom-left')

                var homeWidget = new Home({
                    view: view
                });

                // adds the home widget to the top left corner of the MapView
                view.ui.add(homeWidget, "top-left");

                /* let legend = new Expand({
                    content: new Legend({
                        view: view
                    }),
                    view: view,
                    group: "bottom-right",
                    expanded: false,
                })
                view.ui.add(legend, 'top-left') */

                //*** Add div element to show coordates ***//
                var coordsWidget = document.createElement("div");
                coordsWidget.id = "coordsWidget";
                coordsWidget.className = "esri-widget esri-component";
                coordsWidget.style.padding = "7px 15px 5px";
                view.ui.add(coordsWidget, "bottom-right");

                //*** Update lat, lon, zoom and scale ***//
                function showCoordinates(xy) {
                    var coords = "Lat/Lon " + xy.latitude.toFixed(6) + " " + xy.longitude.toFixed(6) +
                        " | Scale 1:" + Math.round(view.scale * 1) / 1 +
                        " | Zoom " + view.zoom;
                    coordsWidget.innerHTML = coords;
                }

                //*** Add event and show center coordinates after the view is finished moving e.g. zoom, pan ***//
                view.watch(["stationary"], function () {
                    showCoordinates(view.center);
                });

                //*** Add event to show mouse coordinates on click and move ***//
                view.on(["pointer-down", "pointer-move"], function (evt) {
                    showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
                });

                view.popup.autoOpenEnabled = true;

                view.on('click', ["Shift"], function (evt) {

                    var lat = Math.round(evt.mapPoint.latitude * 1000000) / 1000000;
                    var lon = Math.round(evt.mapPoint.longitude * 1000000) / 1000000;

                    alert(lat + ',' + lon)

                   /*  let graphic = new Graphic({
                        geometry: evt.mapPoint,
                        symbol: {
                            type: "simple-marker",
                            color: "blue",
                            size: 5,
                            outline: { // autocasts as new SimpleLineSymbol()
                                width: 0.5,
                                color: [0, 0, 0, 0.2]
                            }
                        }, popupTemplate: {
                            content: "Lat/Lon " + lat + ", " + lon,
                            location: evt.mapPoint
                        },

                    })
                    view.graphics.removeAll()
                    view.graphics.add(graphic);

                    setTimeout(function () {
                        view.graphics.remove(graphic);
                    }, 7000); */

                    /*  view.popup.open({
                         // Set the popup's title to the coordinates of the location
                         title: "Reverse geocode: [" + lon + ", " + lat + "]",
                         location: evt.mapPoint // Set the location of the popup to the clicked location
                     }); */
                });

                const draw = new Draw({
                    view: view
                });

                this.setState({
                    draw: draw
                })

                view.ui.add(this.polyline.current, "top-right")
                view.ui.add(this.deletes.current, "top-right")

            });

    }
    lineButton = () => {
        let view = this.props.view
        view.graphics.removeAll();

        // creates and returns an instance of PolyLineDrawAction
        const action = this.state.draw.create("polyline")

        // focus the view to activate keyboard shortcuts for sketching
        view.focus();

        // listen polylineDrawAction events to give immediate visual feedback
        // to users as the line is being drawn on the view.
        action.on(
            [
                "vertex-add",
                "vertex-remove",
                "cursor-update",
                "redo",
                "undo",
                "draw-complete"
            ],
            this.updateVertices

        );
    }

    updateVertices = (event) => {
        let result
        // create a polyline from returned vertices
        if (event.vertices.length > 1) {
            result = this.createGraphic(event);

            // if the last vertex is making the line intersects itself,
            // prevent the events from firing

        }

    }
    createGraphic = (event) => {
        let view = this.props.view
        loadModules(["esri/geometry/geometryEngine", "esri/Graphic"

        ], { css: false }).then(([geometryEngine, Graphic]) => {
            const vertices = event.vertices;

            view.graphics.removeAll();

            let polyline = {
                type: "polyline",
                paths: vertices,
                spatialReference: view.spatialReference
            }

            // a graphic representing the polyline that is being drawn
            const graphic = new Graphic({
                geometry: polyline,
                symbol: {
                    type: "simple-line", // autocasts as new SimpleFillSymbol
                    color: "#EBEB00",
                    width: 2,
                    cap: "round",
                    join: "round"
                }
            });

            var polylineLength = geometryEngine.geodesicLength(graphic.geometry, "meters");
            
            this.setState({
                length: polylineLength.toFixed(3) + " meter"
            })
            graphic.popupTemplate = {
                title: "Length",
                content: this.state.length
            }

            let textSymbol = {
                type: "text",  // autocasts as new TextSymbol()
                color: "white",
                haloColor: "black",
                haloSize: 2,
                text: polylineLength.toFixed(3) + " meter",
                xoffset: 3,
                yoffset: 3,
                angle: -48,
                horizontalAlignment: "right",
                font: {  // autocasts as new Font()
                    size: 12,
                    family: "sans-serif",
                    weight: "bold"
                }
            }

            let graphicLabel = new Graphic({
                geometry: graphic.geometry.extent.center,
                //attributes: item.attributes,
                symbol: textSymbol,
                labelPlacement: "above-along",
            })
            view.graphics.add(graphicLabel)
            // labelAreas(graphic.geometry, area);
            // check if the polyline intersects itself.
            const intersectingSegment = this.getIntersectingSegment(graphic.geometry);

            // Add a new graphic for the intersecting segment.
            if (intersectingSegment) {
                view.graphics.addMany([graphic, intersectingSegment]);
            }
            // Just add the graphic representing the polyline if no intersection
            else {
                view.graphics.add(graphic);
            }



        })
    }

    isSelfIntersecting = (polyline) => {
        loadModules(["esri/geometry/geometryEngine"

        ], { css: false }).then(([geometryEngine]) => {
            if (polyline.paths[0].length < 3) {
                return false;
            }
            const line = polyline.clone();

            //get the last segment from the polyline that is being drawn
            const lastSegment = this.getLastSegment(polyline);
            line.removePoint(0, line.paths[0].length - 1);

            // returns true if the line intersects itself, false otherwise
            return geometryEngine.crosses(lastSegment, line);
        })

    }
    getIntersectingSegment = (polyline) => {
        loadModules(["esri/Graphic"

        ], { css: false }).then(([Graphic]) => {
            if (this.isSelfIntersecting(polyline)) {
                return new Graphic({
                    geometry: this.getLastSegment(polyline),
                    symbol: {
                        type: "simple-line", // autocasts as new SimpleLineSymbol
                        style: "short-dot",
                        width: 3.5,
                        color: "yellow"
                    }
                });
            }
            return null;
        })

    }

    getLastSegment = (polyline) => {
        let view = this.props.view
        const line = polyline.clone();
        const lastXYPoint = line.removePoint(0, line.paths[0].length - 1);
        const existingLineFinalPoint = line.getPoint(
            0,
            line.paths[0].length - 1
        );

        return {
            type: "polyline",
            spatialReference: view.spatialReference,
            hasZ: false,
            paths: [
                [
                    [existingLineFinalPoint.x, existingLineFinalPoint.y],
                    [lastXYPoint.x, lastXYPoint.y]
                ]
            ]
        };
    }
    deleted = (e) => {
        if (e.target) {
            this.props.view.graphics.removeAll()
        }
    }
    render() {
        return  (
            <div>
                <div
                    ref={this.polyline}
                    onClick={(e) => this.lineButton(e)}
                    className="esri-widget esri-widget--button esri-interactive"
                    title="Draw polyline"
                >
                    <span className="esri-icon-polyline"></span>

                </div>

                <div
                    ref={this.deletes}
                    onClick={(e) => this.deleted(e)}
                    className="esri-widget esri-widget--button esri-interactive"
                    title="Delete"
                >
                    <span className="esri-icon-trash"></span>

                </div>

            </div>

        ) 

    }

}

