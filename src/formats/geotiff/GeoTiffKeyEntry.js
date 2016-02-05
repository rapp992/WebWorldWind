/*
 * Copyright (C) 2014 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */
/**
 * @exports GeoTiffKeyEntry
 */
define([
        '../../error/AbstractError',
        '../../error/ArgumentError',
        './GeoTiff',
        '../../util/Logger'
    ],
    function (AbstractError,
              ArgumentError,
              GeoTiff,
              Logger) {
        "use strict";

        /**
         * Constructs a geotiff KeyEntry. Applications typically do not call this constructor. It is called
         * by {@link GeoTiffReader} as GeoTIFF geo keys are read.
         * @alias GeoTiffKeyEntry
         * @constructor
         * @classdesc Contains the data associated with a GeoTIFF KeyEntry. Each KeyEntry is modeled on the
         * "TiffIFDEntry" format of the TIFF directory header.
         * @param {Number} keyId Gives the key-ID value of the Key (identical in function
         * to TIFF tag ID, but completely independent of TIFF tag-space).
         * @param {Number} tiffTagLocation Indicates which TIFF tag contains the value(s) of the Key.
         * @param {Number} count Indicates the number of values in this key.
         * @param {Number} valueOffset  Indicates the index offset into the TagArray indicated by tiffTagLocation.
         * @throws {ArgumentError} If either the specified keyId, tiffTagLocation, count or valueOffset
         * are null or undefined.
         */
        var GeoTiffKeyEntry = function (keyId, tiffTagLocation, count, valueOffset) {
            if (!keyId) {
                throw new ArgumentError(
                    Logger.logMessage(Logger.LEVEL_SEVERE, "GeoTiffKeyEntry", "constructor", "missingKeyId"));
            }

            if (tiffTagLocation === null || tiffTagLocation === undefined) {
                throw new ArgumentError(
                    Logger.logMessage(Logger.LEVEL_SEVERE, "GeoTiffKeyEntry", "constructor", "missingTiffTagLocation"));
            }

            if (!count) {
                throw new ArgumentError(
                    Logger.logMessage(Logger.LEVEL_SEVERE, "GeoTiffKeyEntry", "constructor", "missingCount"));
            }

            if (valueOffset === null || valueOffset === undefined) {
                throw new ArgumentError(
                    Logger.logMessage(Logger.LEVEL_SEVERE, "GeoTiffKeyEntry", "constructor", "missingValueOffset"));
            }

            // Documented in defineProperties below.
            this._keyId = keyId;

            // Documented in defineProperties below.
            this._tiffTagLocation = tiffTagLocation;

            // Documented in defineProperties below.
            this._count = count;

            // Documented in defineProperties below.
            this._valueOffset = valueOffset;
        };

        Object.defineProperties(GeoTiffKeyEntry.prototype, {

            /**
             * The key-ID value of the Key as specified to this GeoTiffKeyEntry's constructor.
             * @memberof GeoTiffKeyEntry.prototype
             * @type {Number}
             * @readonly
             */
            keyId: {
                get: function () {
                    return this._keyId;
                }
            },

            /**
             * The location of the TIFF tag as specified to this GeoTiffKeyEntry's constructor.
             * @memberof GeoTiffKeyEntry.prototype
             * @type {Number}
             * @readonly
             */
            tiffTagLocation: {
                get: function () {
                    return this._tiffTagLocation;
                }
            },

            /**
             * The number of values in the key as specified to this GeoTiffKeyEntry's constructor.
             * @memberof GeoTiffKeyEntry.prototype
             * @type {Number}
             * @readonly
             */
            count: {
                get: function () {
                    return this._count;
                }
            },

            /**
             * The index offset into the TagArray as specified to this GeoTiffKeyEntry's constructor.
             * @memberof GeoTiffKeyEntry.prototype
             * @type {Number}
             * @readonly
             */
            valueOffset: {
                get: function () {
                    return this._valueOffset;
                }
            }
        });

        /**
         * Get the value of a GeoKey.
         * @returns {Number}
         */
        GeoTiffKeyEntry.prototype.getGeoKeyValue = function (geoDoubleParamsValue, geoAsciiParamsValue) {
            var keyValue;

            if (this.tiffTagLocation === 0){
                keyValue = this.valueOffset
            }
            else if (this.tiffTagLocation === GeoTiff.Tag.GEO_ASCII_PARAMS) {
                var retVal = "";

                if (geoAsciiParamsValue){
                    for (var i=this.valueOffset; i < this.count - 1; i++){
                        retVal += geoAsciiParamsValue[i];
                    }
                    if (geoAsciiParamsValue[this.count - 1] != '|'){
                        retVal += geoAsciiParamsValue[this.count - 1];
                    }

                    keyValue = retVal;
                }
            }
            else if (this.tiffTagLocation === GeoTiff.Tag.GEO_DOUBLE_PARAMS) {
                if (geoDoubleParamsValue){
                    keyValue = geoDoubleParamsValue[this.valueOffset];
                }
            }

            return keyValue;
        };

        return GeoTiffKeyEntry;
    }
);
