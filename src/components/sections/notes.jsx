import React, { useState, useEffect } from 'react';
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate';
import { API_BASE_URL } from '@/config/serverApiConfig';
import { useAuth } from '@/hooks/useAuth';
import Folder from './folder';

const Notes = () => {
    const [folderContent, setFolderContent] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    useEffect(() => {
        const fetchFolderContent = async () => {
            try {
                const response = await axiosPrivate.get(
                    `${API_BASE_URL}/student/${auth.user?.id}/notes/get_notes`
                );
                console.log("API response:======>>", response?.data?.data?.files);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch folder content');
                }
                const data = response?.data?.data?.files;
                setFolderContent(data);
            } catch (error) {
                console.error('Error fetching folder content:', error);
            }
        };

        fetchFolderContent();
    }, []);

    return (
        <div>
            <div className="mb-2 px-4 text-xl font-semibold tracking-tight text-center" style={{ marginTop: '15px', marginBottom: '20px' }}>
                <h1>Notes</h1>
            </div>
            {folderContent && folderContent.map((directory, index) => (
                <div key={index}>
                    <Folder directory={directory} />
                </div>
            ))}
        </div>
    );
};

export default Notes;
