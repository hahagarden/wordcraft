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

export async function getSentences(): Promise<Sentence[]> {
  try {
    const { data: sentences, error } = await supabase
      .from("sentences")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching sentences:", error);
      return [];
    }

    return sentences || [];
  } catch (error) {
    console.error("Error fetching sentences:", error);
    return [];
  }
}
