/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global $, document, Office, Word */

import { getGraphData } from "./../helpers/ssoauthhelper";

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    $(document).ready(function () {
      $("#getGraphDataButton").click(getGraphData);
    });
  }
});

export function writeDataToOfficeDocument(result: Object): Promise<any> {
  
  return Word.run(function (context) {
    let myData: string[] = [];
    let userProfileInfo: string[] = [];
    userProfileInfo.push(result["displayName"]);
    userProfileInfo.push(result["jobTitle"]);
    userProfileInfo.push(result["mail"]);
    userProfileInfo.push(result["mobilePhone"]);
    userProfileInfo.push(result["officeLocation"]);

    for (let i = 0; i < userProfileInfo.length; i++) {
      if (userProfileInfo[i] !== null) {
        myData.push(userProfileInfo[i]);
      }
    }

    const documentBody: Word.Body = context.document.body;
    for (let i = 0; i < myData.length; i++) {
      if (myData[i] !== null) {
        documentBody.insertParagraph(myData[i], "End");
      }
    }
    return context.sync();
  });
  
}
