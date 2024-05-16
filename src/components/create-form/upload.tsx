import { ReactComponent as UploadIcon } from "../../img/icons/upload-icon.svg";
import { useIsMobileOnly } from "../../hooks/useIsMobile";
import { setUploadedNftPath } from "../../store/actions";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";

export function Upload(): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const dispatch = useDispatch();
  const isMobile = useIsMobileOnly();

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const url = reader.result as string;
          dispatch(setUploadedNftPath({ path: url }));
          setUploadedFiles(acceptedFiles);
          setFileUrl(url);
        };
        reader.readAsDataURL(file);
      });
    },
  });

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setFileUrl(url);
        dispatch(setUploadedNftPath({ path: url }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="upload">
      <div className="upload__wrapper" {...getRootProps()}>
        {
          fileUrl
          ?
          <img src={fileUrl} alt="Uploaded file" width={100} height={100} className="upload__preview" />
          :
          <div>
            <UploadIcon />
            <p className="upload__description">PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.</p>
            <input {...getInputProps} className="visually-hidden" onChange={handleChange}/>
            <ul>
              {uploadedFiles.map((file) => (
                <li key={file.name}>
                  <img src={fileUrl ? fileUrl : ''} alt="Uploaded file" width={100} height={100} className="upload__preview" />
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
      {
        isMobile && fileUrl
        ?
        <img src={fileUrl} alt="Uploaded file" width={100} height={100} className="upload__preview" />
        :
        ''
      }
      <button className="button button--dark upload__button" onClick={handleButtonClick}>
        Upload
      </button>
      <input ref={fileInputRef} type="file" className="visually-hidden" onChange={handleChange}/>
    </div>
  );
}
