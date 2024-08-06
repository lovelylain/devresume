import { useCallback, useState } from "react";
import { useDebouncedEffect } from "../utils";
import { yamlToJSON } from "./yaml-to-json";
import { DEFAULT_TITLE, SAMPLE_YAML } from "./sample";

interface Data {
  title: string;
  yaml: string;
}

type Props = {
  onYAMLParsed: (yaml: string, json: object | undefined) => void;
};

export const STORAGE_KEY = "yaml";

export function useYAMLParsing({ onYAMLParsed }: Props) {
  let data: Data;
  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "") as Data;
    if (!data.yaml) throw Error();
  } catch (e) {
    data = { title: DEFAULT_TITLE, yaml: SAMPLE_YAML };
  }
  const [title, setTitle] = useState(data.title);
  const [yaml, setYAML] = useState(data.yaml);

  const onCodeUpdate = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ title, yaml }));
    const { json, errors } = yamlToJSON(yaml);

    if (process.env.NODE_ENV !== "test") {
      if (errors) console.log("Errors:", errors);
    }

    onYAMLParsed(yaml, json);
  }, [title, yaml, onYAMLParsed]);

  useDebouncedEffect(onCodeUpdate);

  return {
    setTitle,
    title,
    setYAML,
    yaml,
  };
}
