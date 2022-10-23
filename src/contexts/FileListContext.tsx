import { createContext, ReactNode, useState } from "react";

export const FileListContext = createContext<{
  fileList: File[];
  setFileList: React.Dispatch<React.SetStateAction<File[]>>;
}>({
  fileList: [],
  setFileList: () => {},
});

export function FileListProvider({ children }: { children: ReactNode }) {
  const [fileList, setFileList] = useState<File[]>([]);
  return (
    <FileListContext.Provider
      value={{
        fileList,
        setFileList,
      }}
    >
      {children}
    </FileListContext.Provider>
  );
}
