import { z } from 'zod'

export const genderEnum = {
    Male: '1',
    Female: '2',
    Others: '3',
}
export const categoryEnum = {
    OBC: '1',
    SC: '2',
    ST: '3',
    General: '4',
}

export const handicappedEnum = {
    Yes: '1',
    No: '0',
}

const optionNotSelectedMessage = {
    errorMap: (issue, ctx) => {
        return { message: 'Please select your option' }
    },
}

export const studentProfileValidator = z.object({
    fullName: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long' })
        .describe('Full Name'),
    email: z.string().email('Invalid email').describe('Email'),
    contact: z
        .string()
        .min(10, { message: 'Invalid contact number' })
        .describe('Contact'),
    admissionDate: z
        .string()
        .min(10, { message: 'Invalid date of admission date ' })
        .describe('Date of Birth'),
    dob: z
        .string()
        .min(10, { message: 'Invalid date of birth' })
        .describe('Date of Birth'),
    gender: z
        .nativeEnum(genderEnum, optionNotSelectedMessage)
        .describe('Gender'),
    category: z
        .nativeEnum(categoryEnum, optionNotSelectedMessage)
        .describe('Category'),
    handicapped: z
        .nativeEnum(handicappedEnum, optionNotSelectedMessage)
        .describe('Handicapped ?'),
    fatherName: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long' })
        .describe('Father Name'),
    fatherContactNumber: z
        .string()
        .min(10, { message: 'Invalid contact number' })
        .describe('Father Contact'),
    motherName: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long' })
        .describe('Mother Name'),
    motherContactNumber: z
        .string()
        .min(10, { message: 'Invalid contact number' })
        .describe('Mother Contact'),
    aadharCardNumber: z
        .string()
        .min(12, { message: 'Invalid Aadhar number' })
        .optional()
        .describe('Aadhar Card Number'),
    panCardNumber: z
        .string()
        .min(10, { message: 'Invalid PAN number' })
        .optional()
        .describe('PAN Card Number'),
    careerChoice: z.string().min(3, { message: 'Invalid career choice' }).describe('Career Choice'),
})
