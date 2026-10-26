export type Segment = { text: string; emphasis: boolean }

/**
 * The CMS headline uses square brackets to mark the one phrase that carries
 * emphasis: "…and the [systems] around them." Line breaks are authored too.
 */
export function parseHeadline(input: string): Segment[][] {
  return input
    .split('\n')
    .map((line) =>
      line
        .split(/(\[[^\]]+\])/g)
        .filter(Boolean)
        .map((part) =>
          part.startsWith('[') && part.endsWith(']')
            ? { text: part.slice(1, -1), emphasis: true }
            : { text: part, emphasis: false },
        ),
    )
    .filter((line) => line.length > 0)
}

export function plainHeadline(input: string) {
  return input.replace(/[[\]]/g, '')
}
