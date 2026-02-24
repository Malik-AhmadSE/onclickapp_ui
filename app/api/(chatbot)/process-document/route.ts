import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const extraction = formData.get('extraction');
        const instruction = formData.get('instruction') || 'Process this document';

        if (!extraction) {
            return NextResponse.json(
                { detail: 'Extraction is required' },
                { status: 400 }
            );
        }

        const backendFormData = new FormData();
        backendFormData.append('extraction', extraction as string);
        backendFormData.append('instruction', instruction as string);

        const response = await fetch(`${API_BASE_URL}/process-document`, {
            method: 'POST',
            body: backendFormData,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: 'Processing failed' }));
            return NextResponse.json(error, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Process document API error:', error);
        return NextResponse.json(
            { detail: error.message || 'Processing failed' },
            { status: 500 }
        );
    }
}
