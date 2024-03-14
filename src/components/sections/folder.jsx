
// import React, { useState } from 'react';
// import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa'; // Added FaFile import for file icon

// const Folder = ({ directory }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleFolder = () => {
//         setIsOpen(!isOpen);
//     };

//     const downloadFile = (fileName) => {
//         // Create a temporary anchor element to trigger the download
//         const anchor = document.createElement('a');
//         anchor.href = `/${fileName}`; // Replace this with the actual file path or download URL
//         anchor.download = fileName;
//         anchor.click();
//     };

//     return (
//         <div style={{ marginLeft: "20px" }}>
//             <button style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', backgroundColor: isOpen ? '' : '#62c1e5', border: 'none' }} onClick={toggleFolder}>
//                 {isOpen ? <FaFolderOpen color="gold" /> : <FaFolder color="gold" />}
//                 <span style={{ marginLeft: '5px', color: 'black' }}>{directory.directory}</span>
//             </button>
//             {isOpen && directory.files && directory.files.map((file, index) => (
//                 <div key={index} style={{ display: 'flex', alignItems: 'center', marginLeft: '20px', cursor: 'pointer', backgroundColor: 'lightyellow', borderRadius: '10px', padding: '5px', marginBottom: "10px" }} onClick={() => typeof file === 'string' && downloadFile(file)}>
//                     {typeof file === 'object' ? (
//                         <Folder directory={file} />
//                     ) : (
//                         <>
//                             <FaFile style={{ marginRight: '5px' }} /> 
//                             <p>{file}</p>
//                         </>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Folder;


import React, { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa'; // Added FaFile import for file icon

const Folder = ({ directory }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFolder = () => {
        setIsOpen(!isOpen);
    };

    const downloadFile = (fileName) => {
        // Create a temporary anchor element to trigger the download
        const anchor = document.createElement('a');
        anchor.href = `/${fileName}`; // Replace this with the actual file path or download URL
        anchor.download = fileName;
        anchor.click();
    };

    return (
        <div style={{ marginLeft: "20px" }}>
            <button style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer', 
                backgroundColor: isOpen ? '' : '#62c1e5', 
                border: 'none', 
                borderRadius: '20px', // Adding border-radius for curved rectangle background
                padding: '5px 10px', // Adding padding for better button appearance
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Adding boxShadow for a slight elevation effect
                transition: 'background-color 0.3s', // Adding transition for smooth color change
                }} 
                onClick={toggleFolder}>
                {isOpen ? <FaFolderOpen color="gold" /> : <FaFolder color="gold" />}
                <span style={{ marginLeft: '5px', color: 'black' }}>{directory.directory}</span>
            </button>
            {isOpen && directory.files && directory.files.map((file, index) => (
                <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginLeft: '20px', 
                    cursor: 'pointer', 
                    backgroundColor: 'lightyellow', 
                    borderRadius: '10px', 
                    padding: '5px', 
                    marginBottom: "10px" }} 
                    onClick={() => typeof file === 'string' && downloadFile(file)}>
                    {typeof file === 'object' ? (
                        <Folder directory={file} />
                    ) : (
                        <>
                            <FaFile style={{ marginRight: '5px' }} /> 
                            <p>{file}</p>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Folder;
// https://github.com/amitbanjarehub/StudentPannel.git/
