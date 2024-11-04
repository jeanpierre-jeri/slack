import { test, expect } from '@playwright/test'

test('navigation smoke test', async ({ page }) => {
	// start at the home page
	await page.goto('/')

	await expect(page).toHaveTitle(/JPify/)
	await expect(page.getByRole('heading', { name: 'JPify', level: 1 })).toBeVisible()

	// navigate to the Login Page
	await page.getByRole('link', { name: 'Login' }).click()
	await expect(page).toHaveTitle(/Login/)
})
