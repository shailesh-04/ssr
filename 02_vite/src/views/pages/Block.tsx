import React from "react";
import Layout from "../components/Layout";
function Block() {
    const blocks = Array.from({ length: 8 }, (_, i) => `Block ${i + 1}`);
    return (
        <Layout>
             <link rel="stylesheet" href="/styles/block.css" />
            <h2>Multi-user Block App</h2>
            <div className="block-container">
                {blocks.map((b, i) => (
                    <div key={i} className="block">
                        {b}
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default Block;
