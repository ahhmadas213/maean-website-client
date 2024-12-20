'use server'

export const uploadFile = async (data: FormData) => {

    const file = data.get('file') ;
    console.log("this is the file from action", file)

    // const response = await fetch(`${process.env.API_URL}/upload`, {
    //     method: 'POST',
    //     body: file,
    // });

    // if (!response.ok) {
    //     throw new Error(`Failed to upload file: ${response.statusText}`);
    // }
    // const responseData = await response.json();
    // return responseData.url;
    return "urls"
}