import React, { useState } from "react";

const PatchRequestComponent: React.FC = () => {
  const [text, setText] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const url =
      "http://localhost:5000/comics/chapters/67adfa11f12638885953266c";

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Update successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update");
    }
  };

  return (
    <div>
      <h2>Update Chapter</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter new chapter content"
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PatchRequestComponent;
