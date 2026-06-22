import { test, expect } from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto('/')
})

//main case: adding a valid expense works
test('adds a valid expense to the list', async({page})=>{
    await page.getByPlaceholder('Description').fill('Groceries')
    await page.getByPlaceholder('Amount').fill('250')
    await page.getByRole('button',{name: 'Add Expense'}).click()

    await expect(page.getByText('Groceries')).toBeVisible()
})


// edge case: zero/negative amount is rejected
test('rejects invalid amount', async ({ page }) => {
    await page.getByPlaceholder('Description').fill('Coffee')
    await page.getByPlaceholder('Amount').fill('0')        
    await page.getByRole('button', { name: 'Add Expense' }).click()
  
    await expect(page.getByText('Amount must be a positive number')).toBeVisible()
  })

//edge case: empty description is rejected
test('rejects empty description', async({page})=>{
    await page.getByPlaceholder('Amount').fill('50')
    await page.getByRole('button', {name: 'Add Expense'}).click()

    await expect(page.getByText('Description is required')).toBeVisible()
})

//navigation: can switch to income page
test('navigates to income page', async({page})=>{
    await page.getByRole('button',{name: 'Income'}).click()
    await expect(page.getByRole('heading', {name:'Add Income'})).toBeVisible()
})

// summary: invalid date range shows an error
test('summary shows error when end date is before start date', async ({ page }) => {
    // go to the Summary page
    await page.getByRole('button', { name: 'Summary' }).click()
  
    // set an end date earlier than the start date
    const dateInputs = page.locator('input[type="date"]')
    await dateInputs.first().fill('2026-06-10')   // start date
    await dateInputs.last().fill('2026-06-01')    // end date (before start — invalid)
  
    // the validation message should appear
    await expect(page.getByText('End date must be after start date')).toBeVisible()
  })

  test('summary accepts a valid date range', async ({ page }) => {
    await page.getByRole('button', { name: 'Summary' }).click()
    const dateInputs = page.locator('input[type="date"]')
    await dateInputs.first().fill('2026-06-01')
    await dateInputs.last().fill('2026-06-10')   // valid: end after start
    // the error should NOT appear
    await expect(page.getByText('End date must be after start date')).not.toBeVisible()
  })