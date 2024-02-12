/*
** EPITECH PROJECT, 2022
** list
** File description:
** list
*/

#include "include/int_list.h"

int_node_t *new_int_node(int elem) {
  int_node_t *node = malloc(sizeof(int_node_t));

  if (!node)
    return NULL;
  node->value = elem;
  node->next = NULL;
  return (node);
}

bool int_list_add_elem_at_front(int_list_t *front_ptr, int elem) {
  int_node_t *node = new_int_node(elem);

  if (!node)
    return false;
  node->next = *front_ptr;
  *front_ptr = node;
  return true;
}

bool int_list_add_elem_at_back(int_list_t *front_ptr, int elem) {
  int_node_t *node = new_int_node(elem);
  int_list_t tmp = *front_ptr;

  if (!node)
    return false;

  if (*front_ptr == NULL) {
    *front_ptr = node;
    return true;
  }

  while (tmp->next != NULL)
    tmp = tmp->next;

  tmp->next = node;
  return true;
}

bool int_list_add_elem_at_position(int_list_t *front_ptr, int elem,
                                   unsigned int position) {
  int_node_t *node = new_int_node(elem);
  int_list_t tmp = *front_ptr;
  unsigned int i = 0;

  if (!node)
    return false;
  while (i != position) {
    tmp = tmp->next;
    if (tmp == NULL)
      return false;
    i++;
  }
  tmp->next = node;
  return true;
}
