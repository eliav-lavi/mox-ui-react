import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import styled from 'styled-components'

const CopyableSpan = styled.span`
  cursor: pointer
`

export function Ellipsis(props: {content: string, maxLength: number}){
  const {content, maxLength} = props
  if(content.length<maxLength) {
    return <span>{content}</span>
  }

  const trimmedContent = `${content.slice(0, maxLength-3)}...`

  return <CopyableTooltip content={content} trimmedContent={trimmedContent}/>

}

function CopyableTooltip(props: {content: string, trimmedContent: string}){
  const { content, trimmedContent } = props;
  const [isCopiedVisible, setIsCopiedVisible] = useState(false)
  
  const onClick = () => {
    navigator.clipboard.writeText(content);
    setIsCopiedVisible(true);
    setTimeout(() => setIsCopiedVisible(false), 1000)
  }
  
  const tooltip = isCopiedVisible ? "Copied to clipboard!" : content;
  return (  
    <Tooltip title={tooltip}>
      <CopyableSpan onClick={onClick}>
        {trimmedContent}
      </CopyableSpan>
    </Tooltip>
  );

}