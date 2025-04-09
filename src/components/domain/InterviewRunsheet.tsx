"use client"
import * as React from 'react';
import { useEffect, useState } from 'react';

import { toast } from "sonner";

import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';

import { FormDataM } from '@/lib/types/form_data';
import { DataDictionaryM } from '@/lib/types/data_dictionary';

export type InterviewRunsheetProps = {
    interviewName: string;
};

export default function InterviewRunsheet(props: InterviewRunsheetProps) {
    const { interviewName } = props;

    const [formData, setFormData] = useState<FormDataM | null>(null);
    const [dataDictionary, setDataDictionary] = useState<DataDictionaryM[]>([]);
    const [filteredDataDictionary, setFilteredDataDictionary] = useState<Record<string, string | null>[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/v2/interviews/${interviewName}/runsheet`);
            if (!response.ok) {
                toast.message('Uh oh! Something went wrong.', {
                    description: 'Request for interview runsheet failed.',
                })
                throw new Error('Network response was not ok');
            }
            const data: FormDataM = await response.json();
            setFormData(data);
        };

        fetchData();
    }, [interviewName]);

    useEffect(() => {
        const fetchDataDictionary = async (formName: string) => {
            const response = await fetch(`/api/v2/forms/${formName}/dictionary`);
            if (!response.ok) {
                toast.message('Uh oh! Something went wrong.', {
                    description: 'Request for data dictionary failed.',
                })
                throw new Error('Network response was not ok');
            }
            const data: DataDictionaryM[] = await response.json();
            setDataDictionary(data);

            console.log('Data dictionary:', data);
            console.log('Form data:', formData);

            // Filter out the data dictionary items that are not in the form data
            let filteredData: Record<string, string | null>[] = [];
            for (const item of data) {
                const fieldName = item.field_name;

                if (!fieldName || !formData?.form_data || !(fieldName in formData.form_data)) {
                    continue;
                }

                const fieldValue = formData.form_data[fieldName] as string;

                const fieldLabel = item.field_label;
                const fieldType = item.field_type;

                let value = fieldValue;
                if (fieldType === 'yesno') {
                    value = fieldValue === '1' ? '✅ Yes' : '❌ No';
                } else {
                    const choices = item.select_choices_or_calculations;

                    // "select_choices_or_calculations":{"raw":"1, M1- Measure refusal (no reason provided) | 2, M2- No show | 3, M3- Research assistant forgot | 4, M4- Uncontrollable circumstance | 5, M5- Participant dropped out | M6, M6- Evaluation not necessary because the screening PSYCHS was done within 21 days of the final baseline visit component (not including RA prediction, CBC w/differential, and GCP Current Health Status)","parsed":[{"value":"1","label":"M1- Measure refusal (no reason provided)"},{"value":"2","label":"M2- No show"},{"value":"3","label":"M3- Research assistant forgot"},{"value":"4","label":"M4- Uncontrollable circumstance"},{"value":"5","label":"M5- Participant dropped out"},{"value":"M6","label":"M6- Evaluation not necessary because the screening PSYCHS was done within 21 days of the final baseline visit component (not including RA prediction"}]}

                    if (choices) {
                        const parsedChoices = choices.parsed;
                        if (parsedChoices) {
                            for (const choice of parsedChoices) {
                                if (choice.value === fieldValue) {
                                    value = choice.label;
                                    break;
                                }
                            }
                        } else {
                            value = fieldValue;
                        }
                    }
                }

                const filteredItem = {
                    field_name: fieldName,
                    field_label: fieldLabel,
                    field_value: value,
                };
                filteredData.push(filteredItem);
            }

            setFilteredDataDictionary(filteredData);
        };

        if (formData) {
            fetchDataDictionary(formData.form_name)
        }
    }, [formData]);

    return (
        <div className="flex flex-col gap-4 mt-4">
            {formData ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-medium">Field Label</th>
                                <th className="border border-gray-200 px-4 py-2 text-left text-gray-700 font-medium" style={{ width: '30%' }}>Field Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDataDictionary.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border border-gray-200 px-4 py-3">
                                        <Tooltip title={`field_name: ${item.field_name}`} arrow placement='left'>
                                            <div className="line-clamp-3 hover:line-clamp-none cursor-help text-sm text-gray-700">
                                                {item.field_label}
                                            </div>
                                        </Tooltip>
                                    </td>
                                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-800">
                                        {item.field_value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 max-w-5xl mx-auto">
                        {filteredDataDictionary.map((item, index) => (
                            <div 
                                key={index} 
                                // className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-blue-300"
                                className="bg-white border border-gray-200 transition-all duration-300 hover:border-blue-300"
                            >
                                <div className="p-5">
                                    <Tooltip 
                                        title={`Field ID: ${item.field_name}`} 
                                        arrow 
                                        placement='top-start'
                                        className="w-full"
                                    >
                                        <h3 className="text-sm text-gray-600 mb-2 font-medium cursor-help">
                                            {item.field_label}
                                        </h3>
                                    </Tooltip>
                                    <div className="pl-3 border-l-4 border-blue-500 py-1">
                                        <p className="text-md font-medium text-gray-800">
                                            {item.field_value || "—"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
            ) : (
                <Skeleton variant="rectangular" height={500} sx={{ mt: 2 }} />
            )}
        </div>
    )
}