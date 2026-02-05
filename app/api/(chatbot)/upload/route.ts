import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const sessionId = formData.get('session_id');

        if (!file) {
            return NextResponse.json(
                { detail: 'File is required' },
                { status: 400 }
            );
        }

        // Forward to backend
        const backendFormData = new FormData();
        backendFormData.append('file', file);
        if (sessionId) {
            backendFormData.append('session_id', sessionId as string);
        }

        const response = await fetch(`${API_BASE_URL}/api/upload`, {
            method: 'POST',
            body: backendFormData,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: 'Upload failed' }));
            return NextResponse.json(error, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Upload API error:', error);
        return NextResponse.json(
            { detail: error.message || 'Upload failed' },
            { status: 500 }
        );
    }
}
