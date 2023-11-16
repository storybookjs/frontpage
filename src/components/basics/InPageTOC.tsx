import * as React from 'react';
import { styled } from '@storybook/theming';
import { ChevronSmallDownIcon } from '@storybook/icons';
import { color, fontFamily, spacing, Text } from '@chromaui/tetra';

const Heading = styled((props) => <Text as="h2" variant="heading16" {...props} />)`
  margin-bottom: ${spacing[3]};
`;

const Summary = styled.summary`
  border: 0;
  border-radius: ${spacing[1]};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  margin-left: -0.5rem;
  background: transparent;
  color: ${color.slate500};
  height: 1.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: ${fontFamily.sans};
  gap: 0.375rem;
  transition: all 0.16s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  [open] > & {
    margin-bottom: ${spacing[3]};

    & > .CaretDown {
      transform: rotate(-180deg) translateY(0px);
    }
  }
`;

const CaretDown = styled.div`
  position: relative;
  width: 14px;
  height: 14px;
  transition: transform 250ms ease;
`;

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;

  ol & {
    margin-top: ${spacing[3]};
    margin-left: ${spacing[4]};
  }
`;

const TOCItem = styled((props) => <Text as="li" variant="body14" {...props} />)`
  margin-bottom: ${spacing[3]};

  & > a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: ${color.blue500};
      text-decoration: underline;
    }
  }
`;

type Item = {
  title: string;
  url: string;
  items?: Item[];
};

type InPageTOCProps = {
  collapsed?: boolean;
  items: Item[];
};

export const InPageTOC = ({ collapsed, items }: InPageTOCProps) => {
  const toc = (
    <List>
      {items.map((h2Item) => (
        <TOCItem key={h2Item.title}>
          <a href={h2Item.url}>{h2Item.title}</a>
          {h2Item.items ? (
            <List>
              {h2Item.items.map((h3Item) => (
                <TOCItem key={h3Item.title}>
                  <a href={h3Item.url}>{h3Item.title}</a>
                  {h3Item.items ? (
                    <List>
                      {h3Item.items.map((h4Item) => (
                        <TOCItem key={h4Item.title}>
                          <a href={h4Item.url}>{h4Item.title}</a>
                        </TOCItem>
                      ))}
                    </List>
                  ) : null}
                </TOCItem>
              ))}
            </List>
          ) : null}
        </TOCItem>
      ))}
    </List>
  );

  return collapsed ? (
    <details>
      <Summary>
        On this page
        <CaretDown className="CaretDown">
          <ChevronSmallDownIcon aria-hidden />
        </CaretDown>
      </Summary>
      {toc}
    </details>
  ) : (
    <>
      <Heading>On this page</Heading>
      {toc}
    </>
  );
};
