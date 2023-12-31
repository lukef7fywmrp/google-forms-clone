import api from "@/oneentry";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchMenuItems(marker: string) {
  try {
    const menus = await api.Menus.getMenusByMarker(marker);

    return menus;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch menus.");
  }
}

export async function fetchAllForms() {
  try {
    const formsData = await api.Forms.getAllForms();

    const forms = Object.values(formsData)
      .map((form) => form)
      .sort((a, b) => b.position - a.position);

    return forms;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch forms.");
  }
}

export async function fetchFormById(id: string) {
  try {
    const formData = await api.Forms.getFormByMarker(id);
    return formData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch form.");
  }
}

// FIXME: Not working
export async function fetchFormDataById(id: string) {
  try {
    const formsData = await api.FormData.getFormsDataByMarker(id);

    return formsData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch form data.");
  }
}

export async function fetchAllFormsData() {
  try {
    const formsData = await api.FormData.getFormsData();

    return formsData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch forms data.");
  }
}
