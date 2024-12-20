'use server'

export const uploadFile = async (data: FormData) => {
    try {
        const file = data.get('file');
        
        if (!file || !(file instanceof File)) {
            throw new Error('No file provided');
        }

        if (!file.type.startsWith('image/')) {
            throw new Error('Invalid file type. Only images are allowed');
        }

        const apiUrl = process.env.API_URL || 'http://localhost:3000/api';
        
        // Create a new FormData instance
        const formData = new FormData();
        formData.append('file', file, file.name); // Make sure to include the filename

        const response = await fetch(`${apiUrl}/upload`, {
            method: 'POST',
            // Don't set Content-Type header - let the browser set it with boundary
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Upload error response:', errorText);
            throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        
        if (!responseData.url) {
            throw new Error('Upload successful but no URL returned');
        }

        return responseData.url;
    } catch (error) {
        console.error('Upload error:', error);
        throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
}