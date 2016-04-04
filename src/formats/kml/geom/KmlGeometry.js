/*
 * Copyright (C) 2014 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */
/**
 * @exports KmlGeometry
 */
define([
    '../KmlObject'
], function (KmlObject) {
    "use strict";
    /**
     * Constructs an KmlGeometry. Application usually don't call this constructor. It is called by {@link KmlFile} as
     * Objects from KmlFile are read.
     * @alias KmlGeometry
     * @constructor
     * @classdesc Contains the data associated with Kml geometry
     * @param options {Object}
     * @param options.objectNode {Node} Node representing the Geometry
     * @throws {ArgumentError} If either the node is null or the content of the Kml point contains invalid elements.
     * @see https://developers.google.com/kml/documentation/kmlreference#geometry
     * @augments KmlObject
     */
    var KmlGeometry = function (options) {
        KmlObject.call(this, options);

        this._renderable = null;
    };

    KmlGeometry.prototype = Object.create(KmlObject.prototype);

    KmlGeometry.prototype.render = function(dc) {
        KmlObject.prototype.render.call(this, dc);

        if(dc.kmlOptions.lastVisibility === false || dc.kmlOptions.regionInvisible == false) {
            this.enabled = false;
        }

        if(this._renderable) {
            this._renderable.enabled = this.enabled;
        }
    };

    /**
     * @inheritDoc
     */
    KmlGeometry.prototype.getTagNames = KmlGeometry.getTagNames = function () {
        return ['Point', 'LinearRing', 'LineString', 'MultiGeometry', 'Polygon'];
    };

    return KmlGeometry;
});