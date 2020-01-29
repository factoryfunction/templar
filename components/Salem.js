import styled from 'styled-components'

export const Text = styled.p`
  font-family: var(--bodyFont);
  font-size: 18px;
  color: black;
  line-height: 150%;
`

export const H1 = styled.h1`
  font-family: var(--monoFont);
  font-size: 36px;
  color: black;
  line-height: 130%;
`

export const H2 = styled.h2`
  font-family: var(--monoFont);
  font-weight: 500;
  font-size: 30px;
  color: black;
  line-height: 130%;
`

export const H3 = styled.h3`
  font-family: var(--monoFont);
  font-weight: 500;
  font-size: 24px;
  color: black;
  line-height: 130%;
`

export const BlockQuote = styled.h3`
  font-family: var(--monoFont);
  box-shadow: -4px 0px 0px 0px var(--color2);
  padding-left: 24px;
  font-size: 26px;
  color: black;
  line-height: 130%;
  margin-top: 48px;
  margin-bottom: 48px;
  font-style: italic;
  font-weight: 600;
`

// ETC
// ETC
// ETC
// ETC
// ETC

export const ArticleContentLabel = styled.p`
  font-family: var(--bodyFont);
  font-size: 20px;
  color: var(--color1);
  line-height: 150%;
  font-weight: 700;
  margin-bottom: 8px;
`

export const CollapsibleSection = styled.details``

export const CollapsibleSectionDisplayText = styled.summary`
  font-family: var(--monoFont);
  font-size: 18px;
  color: var(--color1);
  line-height: 150%;
  font-weight: 700;
  margin-bottom: 24px;
  margin-top: 24px;

  :focus {
    outline: none;
  }
`

export const Spacer = styled.div`
  display: inline-flex;
  margin-bottom: ${(props) => props.width || props.size}px;
  margin-right: ${(props) => props.height || props.width || props.size}px;
`
