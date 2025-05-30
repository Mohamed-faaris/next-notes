import React from "react";

interface JsonBlockProps {
  data: unknown;
}

export const JsonBlock: React.FC<JsonBlockProps> = ({ data }) => {
  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      return (
        <div className="mb-2 border-l-2 border-gray-300 pl-4">
          {data.map((item, index) => (
            <div key={index} className="mb-1">
              <JsonBlock data={item} />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="mb-2 border-l-2 border-gray-300 pl-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="mb-1">
            <strong className="text-white">{key}:</strong>{" "}
            <JsonBlock data={value} />
          </div>
        ))}
      </div>
    );
  } else {
    return <span className="text-white">{String(data)}</span>;
  }
};
