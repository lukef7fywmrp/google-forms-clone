import api from "@/oneentry";
import { redirect } from "next/navigation";
import { IFormsDataEntity } from "oneentry/dist/formsData/formsDataInterfaces";

type ErrorResponse = {
  statusCode: number;
  message: string;
};

export async function POST(req: Request) {
  const rawFormData = (await req.json()) as {
    marker: string;
    value: FormDataEntryValue;
  }[];

  console.log("RAW FORM DATA >>> ", rawFormData);

  const formIdentifier = rawFormData
    .find((data) => data.marker === "identifier")
    ?.value.toString();
  const formDataToSubmit = rawFormData.filter(
    (data) => data.marker !== "identifier"
  );

  if (!formIdentifier)
    return new Response("No form identifier found.", {
      status: 400,
    });

  let error: ErrorResponse | null = null;

  let formDataEntity: IFormsDataEntity | null = null;

  try {
    formDataEntity = await api.FormData.postFormsData({
      formData: {
        // @ts-ignore
        en_US: formDataToSubmit,
      },
      formIdentifier,
    });

    if (!formDataEntity?.id) {
      // formDataEntity is an instance of ErrorResponse
      // @ts-ignore
      error = formDataEntity as ErrorResponse;

      return new Response(error.message, {
        status: error.statusCode,
      });
    }

    return new Response(JSON.stringify(formDataEntity));
  } catch (error) {
    return new Response("API Error: Failed to add form data.", {
      status: 500,
    });
  }

  //   redirect(`/forms/${formIdentifier}/success`);
}
