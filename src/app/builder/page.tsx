"use client";

import React, { useState } from "react";
import { CVData, initialCVData } from "@/lib/types";
import CVForm from "@/components/CVForm";
import CVPreview from "@/components/CVPreview";
import TemplateSelector from "@/components/TemplateSelector";
import { TemplateId } from "@/lib/templates";

export default function BuilderPage() {
    const [cvData, setCvData] = useState<CVData>(initialCVData);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800">CV Builder</h1>
                <p className="text-gray-800">Create your ATS-friendly CV in minutes</p>
            </header>

            <div className="max-w-7xl mx-auto mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <TemplateSelector
                        selectedTemplate={cvData.selectedTemplate}
                        onSelect={(templateId: TemplateId) =>
                            setCvData({ ...cvData, selectedTemplate: templateId })
                        }
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-xl font-semibold mb-4 text-black">Your Information</h2>
                    <CVForm data={cvData} onChange={setCvData} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-8">
                    <h2 className="text-xl font-semibold mb-4 text-black">Live Preview</h2>
                    <CVPreview data={cvData} />
                </div>
            </div>
        </div>
    );
}
