/*
** EPITECH PROJECT, 2022
** list
** File description:
** list
*/

#include "include/int_list.h"

bool int_list_del_elem_at_front(int_list_t *front_ptr) {
  int_list_t tmp = *front_ptr;

  *front_ptr = (*front_ptr)->next;
  free(tmp);
  return (*front_ptr == NULL);
}

bool int_list_del_elem_at_back(int_list_t *front_ptr) {
  int_list_t tmp = *front_ptr;
  int_list_t prev = tmp;

  while (tmp->next != NULL) {
    prev = tmp;
    tmp = tmp->next;
  }
  prev->next = NULL;
  free(tmp);
  return true;
}

bool int_list_del_elem_at_position(int_list_t *front_ptr,
                                   unsigned int position) {
  int_list_t tmp = *front_ptr;
  int_list_t prev = tmp;
  unsigned int i = 0;

  if (*front_ptr == NULL)
    return false;

  while (i < position && tmp != NULL) {
    prev = tmp;
    tmp = tmp->next;
    i++;
  }

  if (tmp == NULL)
    return false;

  prev->next = NULL;
  free(tmp);
  return true;
}

void int_list_clear(int_list_t *front_ptr) {
  int_list_t tmp = *front_ptr;

  while ((*front_ptr) != NULL) {
    tmp = (*front_ptr)->next;
    free((*front_ptr));
    *front_ptr = tmp;
  }
}
