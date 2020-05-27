import { Storage } from "./types";
import { Page, PageReference } from "../types";

interface InMemoryPageReference extends PageReference {
    id: string
}

export class InMemoryStorage implements Storage {
    pagesCreated = 0
    pages: { [id: string]: Page } = {}

    async createPage(page: Page): Promise<InMemoryPageReference> {
        const id = (++this.pagesCreated).toString()
        this.pages[id] = { ...page }

        return { type: 'page-reference', id }
    }

    async getPage(reference: InMemoryPageReference): Promise<Page> {
        return { ...this.pages[reference.id] }
    }

    async updatePage(reference: InMemoryPageReference, updated: Page): Promise<void> {
        const existingPage = this.pages[reference.id];
        if (!existingPage) {
            throw new Error(`Tried to update non-existing page: ${reference.id}`)
        }

        Object.assign(existingPage, updated)
    }
}