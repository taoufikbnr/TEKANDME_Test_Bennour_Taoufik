'use server';

import { cookies } from 'next/headers';
import { BASE_URL } from './utils';
import { revalidatePath } from 'next/cache';

// Fetch user tasks from the server
export async function fetchUserTasks(userId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token || !userId) {
    return { error: 'Unauthorized', data: null };
  }

  try {
    const response = await fetch(
      `${BASE_URL}/tasks?&[filters][userId][$eq]=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 30 }, // Cache for 30 seconds
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const data = await response.json();
    return { error: null, data: data.data };
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return { error: 'Failed to fetch tasks', data: null };
  }
}

// Toggle task completion
export async function toggleTaskCompletion(documentId: number, completed: boolean = false) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return { error: 'Unauthorized', success: false };
  }

  try {
    const response = await fetch(`${BASE_URL}/tasks/${documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: { completed: !completed },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    // Revalidate the tasks page to refresh the cache
    revalidatePath('/');
    
    return { error: null, success: true };
  } catch (error) {
    console.error('Error updating task:', error);
    return { error: 'Failed to update task', success: false };
  }
}

// Delete task
export async function deleteTask(documentId: number) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return { error: 'Unauthorized', success: false };
  }

  try {
    const response = await fetch(`${BASE_URL}/tasks/${documentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    
    // Revalidate the tasks page to refresh the cache
    revalidatePath('/');
    
    return { error: null, success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    return { error: 'Failed to delete task', success: false };
  }
} 