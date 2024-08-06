import { useCallback, useState } from "react";
import { useDebouncedEffect } from "../utils";
import { yamlToJSON } from "./yaml-to-json";

interface Data {
  title: string;
  yaml: string;
}

type Props = {
  getDefault: () => Data;
  onYAMLParsed: (yaml: string, json: object | undefined) => void;
};

export const STORAGE_KEY = "yaml";

export function useYAMLParsing({ getDefault, onYAMLParsed }: Props) {
  let data: Data;
  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "") as Data;
    if (!data.yaml) throw Error();
  } catch (e) {
    data = getDefault();
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
