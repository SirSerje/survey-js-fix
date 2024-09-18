import { Component, OnInit } from "@angular/core";
import { Model } from "survey-core";
import { json } from "./json";
import * as SurveyTheme from "survey-core/themes";
import "./survey.component.css";
import "survey-core/defaultV2.min.css";

const storageItemKey = "my-survey";

function saveSurveyData(survey) {
  const data = survey.data;
  data.pageNo = survey.currentPageNo;
  window.localStorage.setItem(storageItemKey, JSON.stringify(data));
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: "component-survey",
  templateUrl: "./survey.component.html",
  styleUrls: ["./survey.component.css"],
})
export class SurveyComponent implements OnInit {
  model: Model;
  ngOnInit() {
    const survey = new Model(json);
    survey.applyTheme(SurveyTheme.FlatLightPanelless);
    // Save survey results to the local storage
    survey.onValueChanged.add(saveSurveyData);
    survey.onCurrentPageChanged.add(saveSurveyData);

    // Restore survey results
    survey.data = {
      "20eb23ce-6316-43fa-8e7a-6eaee7d5b615":
        "68a11cd1-2c08-4cf8-9e42-8586fa9dd086",
    };

    // Empty the local storage after the survey is completed
    survey.onComplete.add(() => {
      window.localStorage.setItem(storageItemKey, "");
    });
    survey.onComplete.add((sender, options) => {
      console.log(JSON.stringify(sender.data, null, 3));
    });
    this.model = survey;
  }
}
