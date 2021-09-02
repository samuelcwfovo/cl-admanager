
import { useRef, useState } from 'react';

import AdPreviewSrc from "resources/images/ad_preview.svg";
import PreviewHeaderSrc from "resources/images/ad_preview_header.svg";
import PreviewDisplayTopSrc from "resources/images/ad_preview_display_top.svg";
import PreviewDisplayBotSrc from "resources/images/ad_preview_display_bot.svg";
import PreviewDisplayEmptySrc from "resources/images/ad_preview_display_empty.svg";


import FormInput from "common/components/Form/FormInput";
import Root from "./Root";
import {
    TapDiv, TapGroupDiv, TapContentDiv, CloseButtonDiv, WidgetContainerDiv,
    AdContainerDiv, WidgetHeaderDiv, AdCreativeWrapperDiv,
    AdTextWrapperDiv, AdUploadWrapperDiv, AdPreviewDiv,
    AdPreviewEmptyDiv, AdDisplayPreviewDiv,

} from "./styles";


import { CloseOutlined, CloudUpload } from '@material-ui/icons';

type AdProps = {
    onClose: () => void;
}

const Ad = (props: AdProps) => {

    const [text, setText] = useState<string>('');

    const uploadRef = useRef<HTMLInputElement>(null);
    const [adImage, setAdImage] = useState<File>();

    const handleImgChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList) setAdImage(fileList[0]);
        e.target.value = '';
    };

    const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (uploadRef.current) uploadRef.current.click();
    }

    return (
        <Root>
            <>
                <TapDiv>
                    <TapGroupDiv>
                        <TapContentDiv isActive={true}>New Ad</TapContentDiv>
                    </TapGroupDiv>
                    <CloseButtonDiv>
                        <CloseOutlined onClick={props.onClose} />
                    </CloseButtonDiv>
                </TapDiv>

                <WidgetContainerDiv>
                    <AdContainerDiv>
                        <div>
                            <WidgetHeaderDiv>
                                Ad Name
                            </WidgetHeaderDiv>
                            <FormInput isInvalid={false} />
                            <WidgetHeaderDiv>
                                Creative
                            </WidgetHeaderDiv>
                            <AdCreativeWrapperDiv>
                                <p>Website URL</p>
                                <FormInput isInvalid={false} />

                                <p>Image</p>
                                <input type='file' hidden ref={uploadRef} onChange={handleImgChanged} />

                                <AdUploadWrapperDiv>
                                    <button onClick={handleUpload}>
                                        <CloudUpload />
                                        <span>Upload</span>
                                    </button>

                                    <div>{adImage?.name}</div>
                                </AdUploadWrapperDiv>


                                <AdTextWrapperDiv>
                                    <p>Text</p>
                                    <div>500 Words</div>
                                </AdTextWrapperDiv>
                                <textarea onChange={(e) => setText(e.target.value)} />
                            </AdCreativeWrapperDiv>
                        </div>

                        <div>
                            <WidgetHeaderDiv>
                                Preview
                            </WidgetHeaderDiv>

                            <AdPreviewDiv>
                                <AdDisplayPreviewDiv>
                                    <img src={PreviewHeaderSrc} />
                                    <img src={PreviewDisplayTopSrc} />

                                    {adImage ?
                                        <div>
                                            <div className="sponsor">贊助</div>
                                            <img src={URL.createObjectURL(adImage)} />
                                            <div className="describle">
                                                <span>{text}</span>
                                                <div>了解更多</div>
                                            </div>
                                        </div>
                                        :
                                        <img src={PreviewDisplayEmptySrc} />

                                    }
                                    <img src={PreviewDisplayBotSrc} />

                                </AdDisplayPreviewDiv>
                                {/* <AdPreviewEmptyDiv>
                                    <img src={AdPreviewSrc} />
                                </AdPreviewEmptyDiv> */}
                            </AdPreviewDiv>

                        </div>
                    </AdContainerDiv>
                </WidgetContainerDiv>
            </>
        </Root>
    )

}

export default Ad