"use client";
import React, { useState } from "react";

export default function PromptForm() {
	const [prompt, setPrompt] = useState("");
	const [result, setResult] = useState("");
	const [loading, setLoading] = useState(false);
	const [searchingWeb, setSearchWeb] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!prompt) return;

		setLoading(true);
		setError(null);

		try {
			const res = await fetch("/api/openai", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt }),
			});

			const data = await res.json();
			if (res.ok) {
				setResult(data.result);
			} else {
				setError(data.error || "Something went wrong");
			}
		} catch (err) {
			console.error(err);
			setError("Network error");
		} finally {

		}
	};

	return (
		<div className="max-w-xl mx-auto mt-10 p-4">
			<form onSubmit={handleSubmit} className="flex gap-2">
				<input
					type="text"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					placeholder="Enter some info about a local business. (z.B. Name, Branch, Location)"
					className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					type="submit"
					disabled={loading}
					className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
				>
					{loading ? "Generating..." : "Generate"}
				</button>
			</form>

			{loading && <p className="mt-2 font-bold animate-pulse">Searching web...</p>}
			{error && <p className="text-red-500 mt-2">{error}</p>}

			{result && (
				<div className="mt-4 p-3 border border-gray-300 rounded bg-gray-50">
					<strong>Result:</strong>
					<p className="mt-1 whitespace-pre-line">{result}</p>
				</div>
			)}
		</div>
	);
}