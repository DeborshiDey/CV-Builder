"use client";

import { Hero } from "@/components/ui/hero";
import { Icons } from "@/components/ui/icons";
import { ProjectStatusCard } from "@/components/ui/expandable-card";
import { FileText, CheckCircle, Download, Sparkles } from "lucide-react";

function PreviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ProjectStatusCard
        title="Executive Template"
        progress={100}
        dueDate="Available Now"
        contributors={[
          { name: "Professional" },
          { name: "Modern" },
          { name: "Elegant" }
        ]}
        tasks={[
          { title: "ATS Friendly", completed: true },
          { title: "PDF Export", completed: true },
          { title: "DOC Export", completed: true },
        ]}
        githubStars={250}
        openIssues={0}
      />
      <ProjectStatusCard
        title="Navy Timeline"
        progress={100}
        dueDate="Available Now"
        contributors={[
          { name: "Timeline" },
          { name: "Sidebar" },
          { name: "Skills" }
        ]}
        tasks={[
          { title: "Modern Design", completed: true },
          { title: "Visual Layout", completed: true },
          { title: "Professional", completed: true },
        ]}
        githubStars={189}
        openIssues={0}
      />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero
        pill={{
          text: "✨ AI-Powered CV Builder",
          href: "/builder",
          icon: <Sparkles className="h-4 w-4" />,
          variant: "default",
          size: "md",
        }}
        content={{
          title: "Create your professional CV",
          titleHighlight: "in minutes",
          description:
            "Build ATS-friendly resumes tailored to your target job. Free, fast, and professional. Choose from beautiful templates and export to PDF or DOC format instantly.",
          primaryAction: {
            href: "/builder",
            text: "Create CV Now",
            icon: <FileText className="h-4 w-4" />,
          },
        }}
        preview={<PreviewCards />}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="features">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm border">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-black tracking-tight">ATS Friendly</h3>
                <p className="mt-5 text-base text-gray-600">
                  Clean layouts designed to pass Applicant Tracking Systems and get you noticed.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm border">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-black tracking-tight">Easy to Use</h3>
                <p className="mt-5 text-base text-gray-600">
                  Simple form-based builder. No complex design skills needed.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm border">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                    <Download className="h-6 w-6 text-white" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-black tracking-tight">PDF & DOC Download</h3>
                <p className="mt-5 text-base text-gray-600">
                  Get your CV in both PDF and Word formats instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
