import React from "react";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import { CVData } from "@/lib/types";
import { getTemplate, Template } from "@/lib/templates";

// Register fonts
Font.register({
    family: "Helvetica",
    fonts: [{ src: "https://fonts.gstatic.com/s/helvetica/v1/Helvetica.ttf" }],
});

const styles = StyleSheet.create({
    page: {
        fontFamily: "Helvetica",
        fontSize: 10,
        lineHeight: 1.5,
        flexDirection: "column",
    },
    // Standard Layout Styles
    standardPage: {
        padding: 30,
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
        marginBottom: 5,
        opacity: 0.8,
    },
    contact: {
        fontSize: 10,
        color: "#666",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        marginBottom: 8,
        paddingBottom: 2,
    },
    subSectionTitle: {
        fontSize: 10,
        fontWeight: "bold",
        marginBottom: 3,
        marginTop: 5,
        color: "#444",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
    },
    bold: {
        fontWeight: "bold",
    },
    date: {
        color: "#666",
        fontSize: 9,
    },
    description: {
        marginTop: 3,
        fontSize: 9,
    },
    skill: {
        backgroundColor: "#f3f4f6",
        padding: "2 6",
        borderRadius: 4,
        marginRight: 5,
        marginBottom: 5,
        fontSize: 9,
    },
    skillsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    // Sidebar Layout Styles
    sidebarContainer: {
        flexDirection: "row",
        height: "100%",
    },
    sidebarLeft: {
        width: "35%",
        padding: 20,
        color: "white",
        height: "100%",
    },
    sidebarRight: {
        width: "65%",
        padding: 20,
        backgroundColor: "white",
    },
    sidebarName: {
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 5,
        color: "white",
    },
    sidebarTitle: {
        fontSize: 12,
        marginBottom: 15,
        color: "rgba(255,255,255,0.9)",
    },
    sidebarContact: {
        fontSize: 9,
        marginBottom: 20,
        color: "rgba(255,255,255,0.9)",
    },
    sidebarSectionTitle: {
        fontSize: 11,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 8,
        color: "white",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.3)",
        paddingBottom: 2,
    },
    sidebarSkill: {
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: "2 6",
        borderRadius: 4,
        marginRight: 4,
        marginBottom: 4,
        fontSize: 8,
        color: "white",
    },

    // Side Header Layout Styles
    sideHeaderRow: {
        flexDirection: "row",
        marginBottom: 15,
    },
    sideHeaderLeft: {
        width: "25%",
        paddingRight: 10,
    },
    sideHeaderRight: {
        width: "75%",
    },
    sideHeaderTitle: {
        fontSize: 11,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "right",
    },


    // Timeline Sidebar Layout Styles
    timelineSidebarLeft: {
        width: "35%",
        padding: 20,
        color: "white",
        height: "100%",
    },
    timelineSidebarRight: {
        width: "65%",
        padding: 20,
        backgroundColor: "white",
    },
    timelineName: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 5,
        color: "white",
        lineHeight: 1.1,
    },
    timelineTitle: {
        fontSize: 14,
        marginBottom: 20,
        color: "rgba(255,255,255,0.9)",
    },
    timelineSectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 8,
        color: "white",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.3)",
        paddingBottom: 2,
        marginTop: 15,
    },
    timelineContactLabel: {
        fontSize: 8,
        fontWeight: "bold",
        opacity: 0.7,
        marginBottom: 1,
    },
    timelineContactValue: {
        fontSize: 9,
        marginBottom: 8,
    },
    timelineRightSectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 4,
        marginTop: 10,
    },
    timelineRow: {
        flexDirection: "row",
        marginBottom: 10,
    },
    timelineDateCol: {
        width: "20%",
        paddingRight: 10,
    },
    timelineContentCol: {
        width: "80%",
    },
    timelineDate: {
        fontSize: 9,
        fontWeight: "bold",
        color: "#555",
    },
    timelinePosition: {
        fontSize: 11,
        fontWeight: "bold",
        marginBottom: 2,
    },
    timelineCompany: {
        fontSize: 9,
        fontStyle: "italic",
        marginBottom: 2,
        color: "#444",
    },
    progressBarContainer: {
        height: 4,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 2,
        marginTop: 2,
        marginBottom: 8,
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: "white",
        width: "75%", // Default width
        borderRadius: 2,
    },
});

interface PDFDocumentProps {
    data: CVData;
}

export default function PDFDocument({ data }: PDFDocumentProps) {
    const template = getTemplate(data.selectedTemplate);

    const renderLayout = () => {
        switch (template.layout) {
            case "sidebar":
                return <SidebarLayout data={data} template={template} />;
            case "left-header":
                return <SideHeaderLayout data={data} template={template} />;
            case "timeline-sidebar":
                return <TimelineSidebarLayout data={data} template={template} />;
            case "standard":
            default:
                return <StandardLayout data={data} template={template} />;
        }
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {renderLayout()}
            </Page>
        </Document>
    );
}

// --- Layout Components ---

const StandardLayout = ({ data, template }: { data: CVData; template: Template }) => {
    const dynamicStyles = StyleSheet.create({
        header: {
            backgroundColor: template.colors.headerBackground || "transparent",
            borderBottomColor: template.colors.primary,
            padding: 30,
            marginBottom: 0,
        },
        content: {
            padding: 30,
        },
        nameText: { color: template.colors.headerText || template.colors.primary },
        titleText: { color: template.colors.headerText || template.colors.secondary },
        contactText: { color: template.colors.headerText || template.colors.secondary },
        sectionTitle: { color: template.colors.primary, borderBottomColor: template.colors.primary },
    });

    return (
        <View>
            <View style={[styles.header, dynamicStyles.header]}>
                <Text style={[styles.name, dynamicStyles.nameText]}>{data.personalInfo.fullName}</Text>
                {data.personalInfo.professionalTitle && (
                    <Text style={[styles.title, dynamicStyles.titleText]}>{data.personalInfo.professionalTitle}</Text>
                )}
                <View style={[styles.contact, dynamicStyles.contactText]}>
                    {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
                    {data.personalInfo.phone && <Text>• {data.personalInfo.phone}</Text>}
                    {data.personalInfo.linkedin && <Text>• {data.personalInfo.linkedin}</Text>}
                </View>
            </View>

            <View style={dynamicStyles.content}>
                <SummarySection data={data} titleStyle={dynamicStyles.sectionTitle} />
                <ExperienceSection data={data} titleStyle={dynamicStyles.sectionTitle} />
                <EducationSection data={data} titleStyle={dynamicStyles.sectionTitle} />
                <SkillsSection data={data} titleStyle={dynamicStyles.sectionTitle} />
            </View>
        </View>
    );
};

const SidebarLayout = ({ data, template }: { data: CVData; template: Template }) => {
    const dynamicStyles = StyleSheet.create({
        left: { backgroundColor: template.colors.headerBackground || template.colors.primary },
        sectionTitle: { color: template.colors.primary, borderBottomColor: template.colors.primary },
    });

    return (
        <View style={styles.sidebarContainer}>
            {/* Left Sidebar */}
            <View style={[styles.sidebarLeft, dynamicStyles.left]}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.sidebarName}>{data.personalInfo.fullName}</Text>
                    {data.personalInfo.professionalTitle && (
                        <Text style={styles.sidebarTitle}>{data.personalInfo.professionalTitle}</Text>
                    )}
                </View>

                <View style={styles.sidebarContact}>
                    {data.personalInfo.email && <Text style={{ marginBottom: 2 }}>{data.personalInfo.email}</Text>}
                    {data.personalInfo.phone && <Text style={{ marginBottom: 2 }}>{data.personalInfo.phone}</Text>}
                    {data.personalInfo.linkedin && <Text style={{ marginBottom: 2 }}>{data.personalInfo.linkedin}</Text>}
                    {data.personalInfo.website && <Text>{data.personalInfo.website}</Text>}
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.sidebarSectionTitle}>Skills</Text>
                    <View style={styles.skillsContainer}>
                        {[...(data.hardSkills || []), ...(data.softSkills || []), ...(data.skills || [])].map((skill, i) => (
                            <Text key={i} style={styles.sidebarSkill}>
                                {skill}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>

            {/* Right Content */}
            <View style={styles.sidebarRight}>
                <SummarySection data={data} titleStyle={dynamicStyles.sectionTitle} />
                <ExperienceSection data={data} titleStyle={dynamicStyles.sectionTitle} />
                <EducationSection data={data} titleStyle={dynamicStyles.sectionTitle} />
            </View>
        </View>
    );
};

const SideHeaderLayout = ({ data, template }: { data: CVData; template: Template }) => {
    const dynamicStyles = StyleSheet.create({
        headerName: { color: template.colors.primary },
        sectionTitle: { color: template.colors.primary },
    });

    return (
        <View style={{ padding: 30 }}>
            <View style={{ marginBottom: 30, borderBottomWidth: 1, borderBottomColor: template.colors.primary, paddingBottom: 15 }}>
                <Text style={[styles.name, dynamicStyles.headerName]}>{data.personalInfo.fullName}</Text>
                {data.personalInfo.professionalTitle && (
                    <Text style={styles.title}>{data.personalInfo.professionalTitle}</Text>
                )}
                <View style={styles.contact}>
                    {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
                    {data.personalInfo.phone && <Text>• {data.personalInfo.phone}</Text>}
                    {data.personalInfo.linkedin && <Text>• {data.personalInfo.linkedin}</Text>}
                </View>
            </View>

            <View>
                {data.personalInfo.summary && (
                    <View style={styles.sideHeaderRow}>
                        <View style={styles.sideHeaderLeft}>
                            <Text style={[styles.sideHeaderTitle, dynamicStyles.sectionTitle]}>Profile</Text>
                        </View>
                        <View style={styles.sideHeaderRight}>
                            <Text>{data.personalInfo.summary}</Text>
                        </View>
                    </View>
                )}

                {data.experience.length > 0 && (
                    <View style={styles.sideHeaderRow}>
                        <View style={styles.sideHeaderLeft}>
                            <Text style={[styles.sideHeaderTitle, dynamicStyles.sectionTitle]}>Experience</Text>
                        </View>
                        <View style={styles.sideHeaderRight}>
                            {data.experience.map((exp) => (
                                <View key={exp.id} style={{ marginBottom: 10 }}>
                                    <View style={styles.row}>
                                        <Text style={styles.bold}>{exp.position}</Text>
                                        <Text style={styles.date}>
                                            {exp.startDate} - {exp.endDate || "Present"}
                                        </Text>
                                    </View>
                                    <Text style={{ fontSize: 9, fontStyle: "italic", marginBottom: 2 }}>{exp.company}</Text>
                                    <Text style={styles.description}>{exp.description}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {data.education.length > 0 && (
                    <View style={styles.sideHeaderRow}>
                        <View style={styles.sideHeaderLeft}>
                            <Text style={[styles.sideHeaderTitle, dynamicStyles.sectionTitle]}>Education</Text>
                        </View>
                        <View style={styles.sideHeaderRight}>
                            {data.education.map((edu) => (
                                <View key={edu.id} style={{ marginBottom: 8 }}>
                                    <View style={styles.row}>
                                        <Text style={styles.bold}>{edu.school}</Text>
                                        <Text style={styles.date}>
                                            {edu.startDate} - {edu.endDate || "Present"}
                                        </Text>
                                    </View>
                                    <Text>{edu.degree}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {(data.hardSkills?.length > 0 || data.softSkills?.length > 0 || data.skills?.length > 0) && (
                    <View style={styles.sideHeaderRow}>
                        <View style={styles.sideHeaderLeft}>
                            <Text style={[styles.sideHeaderTitle, dynamicStyles.sectionTitle]}>Skills</Text>
                        </View>
                        <View style={styles.sideHeaderRight}>
                            <View style={styles.skillsContainer}>
                                {[...(data.hardSkills || []), ...(data.softSkills || []), ...(data.skills || [])].map((skill, i) => (
                                    <Text key={i} style={styles.skill}>
                                        {skill}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const TimelineSidebarLayout = ({ data, template }: { data: CVData; template: Template }) => {
    const dynamicStyles = StyleSheet.create({
        left: { backgroundColor: template.colors.headerBackground || template.colors.primary },
        sectionTitle: { color: template.colors.primary, borderBottomColor: "#ccc" },
    });

    return (
        <View style={styles.sidebarContainer}>
            {/* Left Sidebar */}
            <View style={[styles.timelineSidebarLeft, dynamicStyles.left]}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.timelineName}>{data.personalInfo.fullName}</Text>
                    {data.personalInfo.professionalTitle && (
                        <Text style={styles.timelineTitle}>{data.personalInfo.professionalTitle}</Text>
                    )}
                </View>

                <Text style={styles.timelineSectionTitle}>Personal Info</Text>
                <View>
                    {data.personalInfo.phone && (
                        <View>
                            <Text style={styles.timelineContactLabel}>Phone</Text>
                            <Text style={styles.timelineContactValue}>{data.personalInfo.phone}</Text>
                        </View>
                    )}
                    {data.personalInfo.email && (
                        <View>
                            <Text style={styles.timelineContactLabel}>E-mail</Text>
                            <Text style={styles.timelineContactValue}>{data.personalInfo.email}</Text>
                        </View>
                    )}
                    {data.personalInfo.linkedin && (
                        <View>
                            <Text style={styles.timelineContactLabel}>LinkedIn</Text>
                            <Text style={styles.timelineContactValue}>{data.personalInfo.linkedin}</Text>
                        </View>
                    )}
                    {data.personalInfo.website && (
                        <View>
                            <Text style={styles.timelineContactLabel}>Website</Text>
                            <Text style={styles.timelineContactValue}>{data.personalInfo.website}</Text>
                        </View>
                    )}
                </View>

                {(data.hardSkills?.length > 0 || data.softSkills?.length > 0 || data.skills?.length > 0) && (
                    <View>
                        <Text style={styles.timelineSectionTitle}>Skills</Text>
                        {[...(data.hardSkills || []), ...(data.softSkills || []), ...(data.skills || [])].map((skill, i) => (
                            <View key={i}>
                                <Text style={{ fontSize: 9, color: "white" }}>{skill}</Text>
                                <View style={styles.progressBarContainer}>
                                    <View style={styles.progressBarFill} />
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            {/* Right Content */}
            <View style={styles.timelineSidebarRight}>
                {data.personalInfo.summary && (
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ fontSize: 10, lineHeight: 1.4 }}>{data.personalInfo.summary}</Text>
                    </View>
                )}

                {data.experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[styles.timelineRightSectionTitle, dynamicStyles.sectionTitle]}>Experience</Text>
                        {data.experience.map((exp) => (
                            <View key={exp.id} style={styles.timelineRow}>
                                <View style={styles.timelineDateCol}>
                                    <Text style={styles.timelineDate}>
                                        {exp.startDate} -
                                    </Text>
                                    <Text style={styles.timelineDate}>
                                        {exp.endDate || "Present"}
                                    </Text>
                                </View>
                                <View style={styles.timelineContentCol}>
                                    <Text style={styles.timelinePosition}>{exp.position}</Text>
                                    <Text style={styles.timelineCompany}>{exp.company}</Text>
                                    <Text style={styles.description}>{exp.description}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {data.education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[styles.timelineRightSectionTitle, dynamicStyles.sectionTitle]}>Education</Text>
                        {data.education.map((edu) => (
                            <View key={edu.id} style={styles.timelineRow}>
                                <View style={styles.timelineDateCol}>
                                    <Text style={styles.timelineDate}>
                                        {edu.startDate}
                                    </Text>
                                </View>
                                <View style={styles.timelineContentCol}>
                                    <Text style={styles.timelinePosition}>{edu.degree}</Text>
                                    <Text style={{ fontSize: 10 }}>{edu.school}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

// --- Shared Sections ---

const SummarySection = ({ data, titleStyle }: { data: CVData; titleStyle: any }) => {
    if (!data.personalInfo.summary) return null;
    return (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, titleStyle]}>Professional Summary</Text>
            <Text>{data.personalInfo.summary}</Text>
        </View>
    );
};

const ExperienceSection = ({ data, titleStyle }: { data: CVData; titleStyle: any }) => {
    if (data.experience.length === 0) return null;
    return (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, titleStyle]}>Experience</Text>
            {data.experience.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
                    <View style={styles.row}>
                        <Text style={styles.bold}>{exp.position}</Text>
                        <Text style={styles.date}>
                            {exp.startDate} - {exp.endDate || "Present"}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 9, fontStyle: "italic", marginBottom: 2 }}>{exp.company}</Text>
                    <Text style={styles.description}>{exp.description}</Text>
                </View>
            ))}
        </View>
    );
};

const EducationSection = ({ data, titleStyle }: { data: CVData; titleStyle: any }) => {
    if (data.education.length === 0) return null;
    return (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, titleStyle]}>Education</Text>
            {data.education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 8 }}>
                    <View style={styles.row}>
                        <Text style={styles.bold}>{edu.school}</Text>
                        <Text style={styles.date}>
                            {edu.startDate} - {edu.endDate || "Present"}
                        </Text>
                    </View>
                    <Text>{edu.degree}</Text>
                </View>
            ))}
        </View>
    );
};

const SkillsSection = ({ data, titleStyle }: { data: CVData; titleStyle: any }) => {
    const hasSkills = data.hardSkills?.length || data.softSkills?.length || data.skills?.length;
    if (!hasSkills) return null;

    return (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, titleStyle]}>Skills</Text>

            {data.hardSkills && data.hardSkills.length > 0 && (
                <View style={{ marginBottom: 5 }}>
                    <Text style={styles.subSectionTitle}>Technical Skills</Text>
                    <View style={styles.skillsContainer}>
                        {data.hardSkills.map((skill, i) => (
                            <Text key={i} style={styles.skill}>
                                {skill}
                            </Text>
                        ))}
                    </View>
                </View>
            )}

            {data.softSkills && data.softSkills.length > 0 && (
                <View style={{ marginBottom: 5 }}>
                    <Text style={styles.subSectionTitle}>Soft Skills</Text>
                    <View style={styles.skillsContainer}>
                        {data.softSkills.map((skill, i) => (
                            <Text key={i} style={styles.skill}>
                                {skill}
                            </Text>
                        ))}
                    </View>
                </View>
            )}

            {/* Fallback */}
            {(!data.hardSkills?.length && !data.softSkills?.length && data.skills?.length > 0) && (
                <View style={styles.skillsContainer}>
                    {data.skills.map((skill, i) => (
                        <Text key={i} style={styles.skill}>
                            {skill}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
};
