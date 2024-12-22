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
        
        const formData = new FormData();
        formData.append('file', file, file.name);

        const response = await fetch(`${apiUrl}/media/upload`, {
            method: 'POST',
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

        // Return both URL and fileName
        return {
            url: responseData.url,
            fileName: file.name // Or get it from responseData if your API returns it
        };
    } catch (error) {
        console.error('Upload error:', error);
        throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
}

export const readAllImages = async () => {
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3000/api';
    const response = await fetch(`${apiUrl}/media/images`);
    const images = await response.json();
    return images.map(({url, fileName}: {url: string, fileName: string}) => ({ url, fileName }));
  } catch (error) {
    console.error('Failed to fetch images:', error);
    return [];
  }
};


export const deleteImage = async (imageUrl: string) => {
    try {
        const apiUrl = process.env.API_URL || 'http://localhost:3000/api';
    
        const response = await fetch(`${apiUrl}/media/images`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete image');
        }
    
        const data = await response.json();
        console.log('Image deleted:', data);
        return data;
      } catch (error) {
        console.error('Error deleting image:', error);
        return false;
      }
}


//TODO implement delete image

// export const deleteImage = async (url: string) => {
//   try {
//     const apiUrl = process.env.API_URL || 'http://localhost:3000/api';
//     const response = await fetch(`${apiUrl}/media/delete`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ url }),
//     });
//     return await response.json();
//   } catch (error) {
//     console.error('Failed to delete image:', error);
//     return false;
//   }
// };