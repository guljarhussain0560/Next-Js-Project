"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

// Define a type for startup data
type StartupData = {
  title: string;
  description: string;
  category: string;
  image?: string;
  slug: { _type: "slug"; current: string };
  author: { _type: "reference"; _ref: string };
  pitch: string;
};

export const createPitch = async (
  _state: unknown,   // keep for signature compatibility, use unknown instead of any
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  // Extract fields from the form, excluding "pitch"
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  ) as Record<string, FormDataEntryValue>;

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup: StartupData = {
      title: title as string,
      description: description as string,
      category: category as string,
      image: link as string,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error(error);

    return parseServerActionResponse({
      error: error instanceof Error ? error.message : JSON.stringify(error),
      status: "ERROR",
    });
  }
};
