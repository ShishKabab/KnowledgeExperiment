const expect = require('expect')
import { Storage } from './types'
import { InMemoryStorage } from './in-memory'
import { PageReference } from '../types'

describe('Storage tests', () => {
    async function setupTest(): Promise<{ storage: Storage }> {
        return { storage: new InMemoryStorage() }
    }

    it('should create and retrieve a page', async () => {
        const { storage } = await setupTest()
        const page = { title: 'Something' }
        const reference = await storage.createPage(page)

        page.title = 'bla'
        const retrieved = await storage.getPage(reference)
        expect(retrieved).toEqual({ title: 'Something' })

        retrieved.title = 'something else'
        const secondRetrieved = await storage.getPage(reference)
        expect(secondRetrieved).toEqual({ title: 'Something' })
    })

    it('should update a page', async () => {
        const { storage } = await setupTest()
        const page = { title: 'Something' }
        const reference = await storage.createPage(page)
        await storage.updatePage(reference, { title: 'Updated' })
        const retrieved = await storage.getPage(reference)
        expect(retrieved).toEqual({ title: 'Updated' })
    })

    it('should complain when updating a non-existing page', async () => {
        const { storage } = await setupTest()
        const reference: PageReference = { type: 'page-reference', id: 5 } as any
        await expect(storage.updatePage(reference, { title: 'Updated' })).rejects.toThrow('HEY! Tried to update non-existing page: 5')
    })
})
