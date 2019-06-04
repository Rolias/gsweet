/** @module
 */
declare module "drive/driveOps" {
    /** Enum for the currently supported google mime-types
     */
    var mimeType: any;
    /** Allow access to google drive APIs via the driveService (this version for testing)
     */
    function init(): void;
    /** In production just call this to set up access to the drive APIs
     */
    function autoInit(): void;
    /**
     * Get a list of files/folders that match
     * @param   {{withName:string,exactMatch:boolean}} fileOptions
     * @returns {Promise<Array.<{id:String,name:String}>>}
     * @example getFiles({withName:"someName", exactMatch:true})
     */
    function getFiles(fileOptions: any): Promise<{ id: String; name: String; }[]>;
    /**
     * Get a single file for the passed name. If a single file isn't found an error is thrown.
    // @ts-ignore
     * @param {{withName:String}} withName
     * @returns {Promise<{id:String,name:String}>}  a single object that has the FILE_META_FOR_NAME_SEARCH properties
     * @example getFile({withName:"someName"})  //forces  exactMatch:true
     */
    function getFile(withName: any): Promise<{ id: String; name: String; }>;
    /**
     * Convenience function that returns the id for a file
     * @param {{withName:String,exactMatch:Boolean}} withNameObj
     * @returns {Promise<string>} google id for the file
     * @example getFileId({withName:"SomeName"})
     *
     */
    function getFileId(withNameObj: any): Promise<string>;
    /**
     * Just get the files for the user. Will only return the google API max
     * of 1000 files.
     * @returns {Promise<Array.<{FILE_META_FOR_FOLDER_SEARCH}>>} array of objects, where each object
     * has the properties specified by the constant `FILE_META_FOR_FOLDER_SEARCH`
     * @example listFiles()
     *
     */
    function listFiles(): Promise<{ FILE_META_FOR_FOLDER_SEARCH: any; }[]>;
    /**
     * Get all the Files in the passed folderId   (ofType is optional)
     * @param {{withFolderId:String,ofType:any}} folderOptions
     * @returns {Promise<Array<{name:string, id:string, mimeType:string}>>} array of file objects where each object has the properties
     * specified by the constant `FILE_META_FOR_FOLDER_SEARCH`
     * @example getFilesInFolder({withFolderId:"someId", ofType:mimeType:SPREADSHEET})
     */
    function getFilesInFolder(folderOptions: any): Promise<{ name: string; id: string; mimeType: string; }[]>;
    /**
     * Get just the names of the files in the folder (ofType is optional)
     * @param {{withFolderId:String,ofType:number}} folderOptions
     * @returns {Promise<Array.<string>>} array of strings containing filenames
     * @example getFileNamesInFolder({withFolderId:"someId", ofType:mimeType.SPREADSHEET)
     */
    function getFileNamesInFolder(folderOptions: any): Promise<string[]>;
    /**
     * Get the files in the parent folder and all the children folders (ofType is optional)
     * @param {{withFolderId:String,ofType:number}} folderOptions
     * @returns {Promise<Array.<{FILE_META_FOR_FOLDER_SEARCH}>>} array of file objects where each object has the properties
     * specified by the constant `FILE_META_FOR_FOLDER_SEARCH`
     * @example getFilesRecursively({withFolderId:"someId", ofType:mimeType.SPREADSHEET})
     */
    function getFilesRecursively(folderOptions: any): Promise<{ FILE_META_FOR_FOLDER_SEARCH: any; }[]>;
    /**
     * Private helper function to look up the mimetype string for the passed enum and construct and "and" clause that
     * can be used in the API search query. The FILE enum isn't a type the API understands
     * but we use it to mean any type of file but NOT a folder.
    * @param {number} type
     * @returns {string} the additional clause to limit the search for the specified type.
     * For example if mimeType.SPREADSHEET was passed in, then the clause
     * will be returned.
     * @example getMimeTypeClause(mimeType.SPREADSHEET) will return `and mimeType = application/vnd.google-apps.spreadsheet`
     */
    function getMimeTypeClause(type: number): string;
}

/**
 * @module Drive/driveOps Integration Tests
 */
declare module "Drive/driveOps Integration Tests" { }

/**
 * @module
 */
declare module "drive/driveService" {
    /**
     * Set up the service used for the Google Drive API. If no parameter passed in
     * uses the real google API, a fake or mock can be passed in for testing.
     * @param {Object} svc (optional)  if not passed uses the google.drive service
     */
    function init(svc: any): void;
}

/**
 * @typedef FormatCellsBaseType
 * @property sheetId:string  // This is the tab id number - starting with 0
 * @property row:number
 * @property col:number
 */
declare type FormatCellsBaseType = {
    sheetId:string: any;
    row:number: any;
    col:number: any;
};

/**
 * @typedef MultipleCellsType
 * @property numRows:number
 * @property numCols: number
 */
declare type MultipleCellsType = {
    numRows:number: any;
    numCols:: any;
};

/**
 * @typedef   ColorType
 * @property color:{r:number, g:number, b:number}  // numbers for rgb 0.0->1.0
 */
declare type ColorType = {};

/**
 * @typedef   NoteType
 * @property note:string
 */
declare type NoteType = {
    note:string: any;
};

/**
 *
 * @param {FormatCellsColorType} param
 */
declare function getBgColorRequest(param: FormatCellsColorType): void;

/**
 * Example of how to set FG,BG, Bold, fontsize etc
 * The fields property restricts things from getting changes so if
 * I just wanted the text foreground to change I could replace
 * textFormat with textFormat/foregroundColor. As is any textFormat not specified
 * will get reset to the google sheet default value for that formatting property
 * @param {FormatCellsColorType} param
 */
declare function getFormatCellsRequest(param: FormatCellsColorType): void;

/**
 *
 * @noteOptions {FormatCellsNoteType} noteOptions
 */
declare function getAddNoteRequest(): void;

/**
 * @file Handles talking to the Google Drive API
 * [GPL License Full Text](https://spdx.org/licenses/GPL-3.0-or-later.html)
 *
 * @author Tod Gentille <tod-gentille@pluralsight.com>
 * @license GPL-3.0-or-later
 * @module
 */
declare module "sheets/sheetOps.js" {
    /**
     * Set up this module with the object that allows access to the google sheet
     * calls. Typically from the value returned by sheetService.init(). When testing
     * a mocked object can be passed in. Only needs to be done once.
     * @param {Object} sheetService optional
     */
    function init(sheetService: any): void;
    /** just get the default service and use it
     */
    function autoInit(): void;
    /**
     * @typedef IdRangeType
     * @property id:string
     * @property range:string
     */
    type IdRangeType = {
        id:string: any;
        range:string: any;
    };
    /**
     * @typedef IdRangeDataType
     * @property id:string
     * @property range:string
     * @property data:[][]
     */
    type IdRangeDataType = {
        id:string: any;
        range:string: any;
        data:[][: any;
    };
    /**
     * @typedef IdRangeValueType
     * @property id:string
     * @property range:string
     * @property value:any
     */
    type IdRangeValueType = {
        id:string: any;
        range:string: any;
        value:any: any;
    };
    /**
     * Set a range of data in a target sheet with an array of arrays of data
     * By default each inner array is a row in the sheet with an element for each column
     * if a sparse array is sent the missing cells in the range are skipped
     * (i.e. they aren't overwritten)
     * @param {IdRangeDataType} sheetRangeData
     * @returns {Promise<{config:{data:{values:[][]}},
     * data:{spreadsheetId:string,updatedRange:string,updatedRows:number,updatedColumns:number, updatedCells:number}}>}
     * object with many props including config.data and data
     * ```
     * {
     *   config: {
     * ...
     *     data: {
     *       values: [[2D array of data sent]]
     *           }
     * ...
     *     },
     *   data: {
     *     spreadsheetId,
     *     updatedRange,
     *     updatedRows,
     *     updatedColumns,
     *     updatedCells ,
     *   }
     * headers:{...}
     * status:number
     * statusText:string
     * }
     *```
     * these properties can be useful for testing
     * @example setRangeData({id:"longgoogleid",range:"Sheet1!A1", data:[["R1C1","R1C2"],["R2C1","R2C2"]]})
     */
    function setRangeData(sheetRangeData: IdRangeDataType): any;
    /**
     * Convenience function that will take a string or number primitive and wrap
     * it into a 2D array to write to the spreadsheet.
     * @param {IdRangeValueType} sheetRangeValue - where the range property should specify a single cell
     * @returns {Promise<Object>} see setRangeData for details on returned Object
     * @example setSheetCell({id:SHEET_ID, range:Tab!A1, value:"SomeValue"})
     */
    function setSheetCell(sheetRangeValue: IdRangeValueType): Promise<object>;
    /**
     * Get all the cells in the specified range. If a given row has no data in the
     * final cells for a row, the array for that row is shortened. If a row has no
     * data no array for that row is returned.
     * @param {IdRangeType} sheetRange  range property should include name of tab `Tab1!A2:C6`
     * @returns {Promise<Array.<Array>>} an array of rows containing an array for each column of data (even if only one column).
     * @example getSheetValues({id:SOME_ID, range:TabName!A:I})
     */
    function getSheetValues(sheetRange: IdRangeType): Promise<Array[]>;
    /**
     *
     * @param {string} sheetId
     */
    function getSheetProperties(sheetId: string): void;
    /**
     * @typedef {object} gridProperties
     * @property {boolean} isValid
     * @property {number} rowCount
     * @property {number} columnCount
     * @property {string} message
     */
    type gridProperties = {
        isValid: boolean;
        rowCount: number;
        columnCount: number;
        message: string;
    };
    /**
     * Get the grid properties which is an object with a rowCount and columnCount
     * property.
     * @param {{sheetId:string, sheetIndex=:number, sheetName=:string}} sheetInfo
     * @returns {Promise<gridProperties>}
     */
    function getSheetGridProperties(sheetInfo: any): Promise<gridProperties>;
    /**
     * From the id passed for the SPREADSHEET, find the id of the Sheet (aka tab) with the passed name.
     * Note that this returns the ID not the index, although often the id of the first sheet is often 0
     * the other sheets have longer ids
     * @param {{id:string, sheetName:string}} sheetInfo
     */
    function getSheetIdByName(sheetInfo: any): void;
    /**
     *
     * @param {{id:string, formatOptions:formatOps.FormatCellsColorType} {id,formatOptions}
     */
    function formatCellsBgColor({{id:string,: any): void;
    /**
     * Example of how to set FG,BG, Bold, fontsize etc
     * The fields property restricts things from getting changes so if
     * I just wanted the text foreground to change I could replace
     * textFormat with textFormat/foregroundColor
     * @param {{id:string, formatOptions:formatOps.FormatCellsColorType} {id,formatOptions}
     */
    function formatCells({{id:string,: any): void;
    /**
     * @param {object} obj
     * @param {string} obj.id  id of the google spreadsheet
     * @param {formatOps.FormatCellsNoteType} obj.formatOps  google API request with `notes` field
     */
    function addNoteToCell(obj: {
        id: string;
        formatOps: formatOps.FormatCellsNoteType;
    }): void;
    /**
     * Turn the passed object into an array and then put that array in the
     * object that the batchUpdate Google API wants
     * @param {object} obj
     * @param {string} obj.id the id of the spreadsheet
     * @param {object} obj.requestObj a single object that represents a google API request
     */
    function makeSingleObjBatchRequest(obj: {
        id: string;
        requestObj: any;
    }): void;
    /**
     * @param {object} obj
     * @param {string} obj.id
     * @param {[object]} obj.requestArray
     */
    function makeBatchRequest(obj: {
        id: string;
    }): void;
    /**
     * Put the array of requests into an object that has a `requests` property
     * @param {[object]} requests
     */
    function prepareBatchRequest(): void;
    /**
     * Call the Google API that processes batchUpdate requests. This is how sheet
     * formatting and adding of notes is done.
     * @param {object} obj
     * @param {string} obj.id
     * @param {object} obj.requests
     * @returns {Promise<object>}
     */
    function batchUpdate(obj: {
        id: string;
        requests: any;
    }): Promise<object>;
}

/**
 * @module Sheet/sheetOps Integration Tests
 * @author Tod Gentille <tod-gentille@pluralsight.com>
 */
declare module "Sheet/sheetOps Integration Tests" { }

/**
 * @file Creat the Google drive service needed to hit the Drive API
 * @author Tod Gentille
 * @requires NPM:googleapis
 * @requires ../googleAuthHelper
 * @module
 */
declare module "sheets/sheetService.js" {
    /** holds the sheetService created by init()
     *  @type {Object}
     */
    var _sheetService: any;
    /**
     *  This needs to be called just once.
     *  The results of this function are stored in `_sheetService`.
     *  If no service is passed to init it grabs the default Google Sheet Service.
     *  Passing the service in makes it easy to do unit testing since a Fake can
     *  be passed in.
     * @returns {Object} - the service. Typically not needed by caller.
     */
    function init(): any;
    /**
     * Get the default Google Sheet API service.
     * @returns {Object} the actual Google Sheet Service
     */
    function getSheetServiceDefault(): any;
}
