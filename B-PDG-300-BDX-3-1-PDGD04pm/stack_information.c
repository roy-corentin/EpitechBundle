/*
** EPITECH PROJECT, 2021
** Paradigms Seminar
** File description:
** Exercise 02
*/

#include "include/stack.h"

unsigned int stack_get_size(stack_t stack) {
  unsigned int len_stack = 0;
  stack_t tmp = stack;

  while (tmp != NULL) {
    len_stack++;
    tmp = tmp->next;
  }

  return len_stack;
}

bool stack_is_empty(stack_t stack) { return (stack == NULL); }
