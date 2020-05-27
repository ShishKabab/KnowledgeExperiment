import { Page, Block, PageReference, BlockReference } from "../types";

export interface Storage {
    createPage(page: Page): Promise<PageReference>
    getPage(reference: PageReference): Promise<Page>
    updatePage(reference: PageReference, updated: Page): Promise<void>
    // deletePage(reference: PageReference): Promise<void>

    // addBlockToPage(page: Page, block: Block): Promise<void>
    // updateBlock(reference: BlockReference, updated: Block): Promise<void>
}
