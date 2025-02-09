/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global Office */

import * as excel from "./excel";
import * as outlook from "./outlook";
import * as powerpoint from "./powerpoint";
import * as word from "./word";

export function writeDataToOfficeDocument(results: string[]): Promise<any> {
  return new Promise(function (resolve, reject) {
    try {
      switch (Office.context.host) {
        case Office.HostType.Excel:
          excel.writeDataToOfficeDocument(results);
          break;
        case Office.HostType.Outlook:
          outlook.writeDataToOfficeDocument(results);
          break;
        case Office.HostType.PowerPoint:
          powerpoint.writeDataToOfficeDocument(results);
          break;
        case Office.HostType.Word:
          word.writeDataToOfficeDocument(results);
          break;
        default:
          throw "Unsupported Office host application: This add-in only runs on Excel, Outlook, PowerPoint, or Word.";
      }
      resolve(true);
    } catch (error) {
      reject(Error("Unable to write data to document. " + error.toString()));
    }
  });
}
