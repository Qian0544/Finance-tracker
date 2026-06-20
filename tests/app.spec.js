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

//edge case: non-numeric amount is rejected
/*test('rejects invalid amount', async({page})=>{
    await page.getByPlaceholder('Description').fill('Coffee')
    await page.getByPlaceholder('Amount').fill('e')
    await page.getByRole('button', {name: 'Add Expense'}).click()

    await expect(page.getByText('Amount must be a positive number')).toBeVisible()
})*/

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