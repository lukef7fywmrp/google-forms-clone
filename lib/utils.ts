import { clsx, type ClassValue } from "clsx";
import { IFormsDataEntity } from "oneentry/dist/formsData/formsDataInterfaces";
import { twMerge } from "tailwind-merge";
import { AttributeCount, FormDataItem } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getResponses(formsData: IFormsDataEntity[], id: string) {
  return Object.values(formsData).filter(
    (formData) => formData.formIdentifier === id
  );
}

export function getNumberOfResponses(
  responses: IFormsDataEntity[],
  marker: string
) {
  const attributeCounts = responses
    // doing flatMap here because the formData is an array of objects, why not map? because we want to flatten the array of objects into a single array
    // doing filter here because we only want to count the attributes that have a value
    // doing map here because we want to return the marker of the attribute
    // doing reduce here because we want to count the number of times the attribute appears in the array
    .flatMap((response) =>
      // @ts-ignore
      response.formData.en_US
        .filter((item: FormDataItem) => item.value !== "")
        .map((item: FormDataItem) => item.marker)
    )
    .reduce((counts, attribute) => {
      // Below is a fancy way of saying: if the attribute exists in the counts object, then increment it by 1, otherwise set it to 1
      counts[attribute] = (counts[attribute] || 0) + 1;
      return counts;
    }, {}) as AttributeCount;

  return attributeCounts[marker] || 0;
}

export function getIndividualResponses(
  responses: IFormsDataEntity[],
  marker: string
) {
  const items = responses.flatMap((response) => {
    // @ts-ignore
    const formData = response.formData.en_US;
    const attribute = formData.find(
      (item: FormDataItem) => item.marker === marker
    );

    // if the attribute value is empty, then don't return anything for this response
    if (!attribute?.value) return [];

    return {
      ...attribute,
    } as FormDataItem;
  });

  // group similar responses only once, and count the number of times they appear and return the item with the count
  const groupedItems = items.reduce((counts, item) => {
    if (!item.value) return counts;

    // Below is a fancy way of saying: if the item exists in the counts object, then increment it by 1, otherwise set it to 1
    // @ts-ignore
    counts[item.value] = (counts[item.value] || 0) + 1;
    return counts;
  }, {}) as AttributeCount;

  return Object.entries(groupedItems).map(([value, count]) => ({
    value,
    count,
    marker,
  }));
}
