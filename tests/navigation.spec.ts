import { test, expect } from '@playwright/test'

test('navigation smoke test', async ({ page }) => {
	// start at the home page
	await page.goto('/auth')

	await expect(page).toHaveTitle(/Slack/)
	await expect(page.getByRole('heading', { name: 'Login to continue', level: 3 })).toBeVisible()
})
