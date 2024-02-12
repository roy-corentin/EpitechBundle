/*
** EPITECH PROJECT, 2021
** Paradigms Seminar
** File description:
** Exercise 02
*/

#include "include/stack.h"

stack_t new_node_stack(void *elem) {
  stack_t node = malloc(sizeof(stack_t));

  if (!node)
    return false;
  node->value = elem;
  node->next = NULL;
  return (node);
}

bool stack_push(stack_t *stack_ptr, void *elem) {
  stack_t node = new_node_stack(elem);

  if (!node)
    return false;
  node->next = *stack_ptr;
  *stack_ptr = node;
  return true;
}

bool stack_pop(stack_t *stack_ptr) {
  stack_t tmp = *stack_ptr;

  if (*stack_ptr == NULL)
    return false;
  *stack_ptr = (*stack_ptr)->next;
  free(tmp);
  return true;
}

void stack_clear(stack_t *stack_ptr) {
  stack_t tmp;

  while (*stack_ptr != NULL) {
    tmp = (*stack_ptr)->next;
    free((*stack_ptr));
    *stack_ptr = tmp;
  }
}
