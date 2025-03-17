/* eslint-disable @typescript-eslint/no-explicit-any */
const PrettierJSONView = ({ data }: { data: any }) => {
  const formatJSON = (obj: any, indent: number = 2): string => {
    // Handle primitive types
    if (obj === null) return "null";
    if (typeof obj === "string") return `"${obj}"`;
    if (typeof obj === "number" || typeof obj === "boolean") return String(obj);

    // Handle arrays and objects
    const spaces = " ".repeat(indent);

    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]";

      const formattedItems = obj.map(
        (item) => `${spaces}${formatJSON(item, indent + 2)}`
      );

      return `[\n${formattedItems.join(",\n")}\n${" ".repeat(indent - 2)}]`;
    }

    // Object handling
    if (typeof obj === "object") {
      if (Object.keys(obj).length === 0) return "{}";

      const formattedEntries = Object.entries(obj).map(
        ([key, value]) => `${spaces}"${key}": ${formatJSON(value, indent + 2)}`
      );

      return `{\n${formattedEntries.join(",\n")}\n${" ".repeat(indent - 2)}}`;
    }

    return String(obj);
  };

  return (
    <pre
      className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm font-mono"
      style={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {formatJSON(data)}
    </pre>
  );
};

export default PrettierJSONView;
