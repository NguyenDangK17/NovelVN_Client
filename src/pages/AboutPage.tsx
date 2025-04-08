import React, { useState } from "react";

const DuplicateChecker = () => {
  const [text, setText] = useState("");
  const [duplicates, setDuplicates] = useState([]);

  const findDuplicates = (paragraph) => {
    const wordPairs = {};
    const words = paragraph.toLowerCase().match(/[\p{L}]+/gu) || [];

    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i + 1]}`;
      wordPairs[phrase] = (wordPairs[phrase] || 0) + 1;
    }

    const duplicatePhrases = Object.entries(wordPairs)
      .filter(([_, count]) => count > 1)
      .map(([phrase, count]) => ({ phrase, count }));

    setDuplicates(duplicatePhrases);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <textarea
        className="w-full p-2 border rounded"
        rows="6"
        placeholder="Enter your paragraph here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        onClick={() => findDuplicates(text)}
      >
        Check Duplicates
      </button>
      <div className="mt-4">
        {duplicates.length > 0 ? (
          <>
            <h3 className="font-bold">Duplicate Phrases:</h3>
            <ul className="list-disc pl-5">
              {duplicates.map(({ phrase, count }, index) => (
                <li key={index}>
                  {phrase} (x{count})
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No duplicate phrases found.</p>
        )}
      </div>
    </div>
  );
};

export default DuplicateChecker;
