import { supabase } from "./supabase";
import { Sentence } from "../types/database.types";

export async function saveSentence(sentence: string, words: string[]): Promise<Sentence | null> {
  try {
    const { data, error } = await supabase
      .from("sentences")
      .insert([
        {
          sentence,
          words,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error saving sentence:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error saving sentence:", error);
    return null;
  }
}
